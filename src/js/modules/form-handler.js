// modules
import intlTelInput from "./intl-tel-input";
import service from "./service";
import showLeeloo from "./show-leeloo";
import showSuccess from "./show-success";
import submit from "./submit";
import translateMessage from "./translate-message";
import validation from "./just-validate";
// components
import notify from "../components/notify";

const submitButton = document.querySelector('button[type="submit"]');

function addDisabledAttr() {
  if (submitButton) {
    return submitButton.setAttribute("disabled", true);
  }
}

function removeDisabledAttr() {
  if (submitButton) {
    return submitButton.removeAttribute("disabled");
  }
}

class Loading {
  constructor(form, loadingText) {
    this.form = form;
    this.loadingText = loadingText;
    this.loadingBar = `[data-loading="${this.form.id}"]`;
  }

  show() {
    if (!this.form.parentNode.querySelector(this.loadingBar)) {
      this.form.insertAdjacentHTML(
        "afterend",
        `
        <div data-loading="${this.form.id}">
          <p class="mb-2 text-center font-bold text-loadingtext">${this.loadingText}</p>
          <div class="loading-bar"></div>
        </div>
        `,
      );
    }
  }

  hide() {
    const loadingElement = this.form.parentNode.querySelector(this.loadingBar);

    if (loadingElement) {
      loadingElement.remove();
    }
  }
}

export default async function formHandler({
  formId,
  productName = window.productName,
  productId = window.productId,
}) {
  const form = document.getElementById(formId);
  if (!form) throw new Error(`❌ Form with formId «${formId}» not found`);

  const name = form.querySelector('[name="name"]');
  const phone = form.querySelector('[name="phone"]');
  const email = form.querySelector('[name="email"]');
  // const telegram = form.querySelector('[name="telegram"]');
  // const notes = form.querySelector('[name="notes"]');
  const iti = intlTelInput(phone);

  validation(form)
    .addField(`#${phone.id}`, [
      {
        validator: () =>
          iti.getSelectedCountryData()?.iso2 === "ua"
            ? iti.isValidNumberPrecise()
            : iti.isValidNumber(),
        errorMessage: "Phone number is invalid!",
      },
    ])
    .onSuccess(async (event) => {
      event.preventDefault();
      addDisabledAttr();

      // Check email domain
      if (!(await submit.checkEmailDomain(email.value))) {
        removeDisabledAttr();
        return notify({
          status: "emailNotExist",
        });
      }

      const loading = new Loading(form, translateMessage("loadingMessage"));
      form.style.display = "none";
      loading.show();

      const formData = {
        userName: name.value.trim(),
        userPhone: iti.getNumber(),
        userEmail: email.value,
        // userTelegram: telegram.value,
        // userNotes: notes.value,
        productName,
        productId,
      };

      dataLayer.push({
        event: "lead",
        phone: formData.userPhone,
        email: formData.userEmail,
        conversionId: service.uid(),
      });

      const crmData = submit.generateData(formData);

      try {
        const crmResponse = await submit.send(crmData);

        if (crmResponse.ok) {
          // window.leelooHash = "ldpwqn";
          return !!window.leelooHash
            ? showLeeloo(form, crmData)
            : showSuccess(form);
        } else {
          form.style.display = "block";
          notify({ status: "failure" });
          console.error(
            `❌ Error: [crmResponse] Status: ${crmResponse.status}; Message: ${crmResponse.statusText}`,
          );
          submit.logToTelegramChannel(
            formData,
            `❌ Error: [crmResponse] Status: ${crmResponse.status}; Message: ${crmResponse.statusText}`,
          );
        }
      } catch (error) {
        form.style.display = "block";
        notify({ status: "failure" });
        console.error(`❌ Catch Error: [crmResponse] Message: ${error}`);
        submit.logToTelegramChannel(
          formData,
          `❌ Catch Error: [crmResponse] Message: ${error}`,
        );
      } finally {
        loading.hide();
        removeDisabledAttr();
      }
    });
}
