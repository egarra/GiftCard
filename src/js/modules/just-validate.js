import JustValidate from "just-validate";
import justValidateDictLocale from "../../json/justValidateDictLocale.json";

/* https://just-validate.dev/docs/instance/ */
const globalConfig = {
  errorFieldCssClass: "validate-error-field",
  errorLabelCssClass: "validate-error-label",
  successFieldCssClass: "validate-success-field",
  focusInvalidField: true,
  lockForm: true,
};

function setDictLocale(locale = window.locale) {
  return justValidateDictLocale.map(({ key, dict }) => {
    const dictLocale = {
      [locale]: dict[locale],
    };

    if (!dict[locale]) {
      throw new Error(
        `No locale found for <${locale}>. Please add it to the justValidateDictLocale.json file.`,
      );
    }

    return { key, dict: dictLocale };
  });
}

function setInputsRules(input) {
  const { required } = input;
  const { field } = input.dataset;

  /* https://just-validate.dev/docs/category/rules */
  const fields = {
    name: [
      {
        rule: "required",
        errorMessage: "Name is required",
      },
      {
        rule: "minLength",
        value: 2,
        errorMessage: "The field must contain a minimum of 2 characters",
      },
      {
        rule: "maxLength",
        value: 30,
        errorMessage: "The field must contain a maximum of 30 characters",
      },
      {
        rule: "customRegexp",
        value: getNameRegex(),
        errorMessage: "Name is invalid",
      },
    ],
    email: [
      {
        rule: "required",
        errorMessage: "Email is required",
      },
      {
        rule: "email",
        errorMessage: "Email is invalid!",
      },
      {
        rule: "customRegexp",
        value: getEmailRegex(),
        errorMessage: "Email is invalid!",
      },
    ],
    phone: [
      {
        rule: "required",
        errorMessage: "Phone number is required",
      },
      {
        rule: "number",
        errorMessage: "Phone number is invalid!",
      },
    ],
    checkbox: [
      {
        rule: "required",
        errorMessage: "The field is required",
      },
    ],
    text: [
      {
        rule: "minLength",
        value: 3,
        errorMessage: "The field must contain a minimum of 3 characters",
      },
      {
        rule: "maxLength",
        value: 100,
        errorMessage: "The field must contain a maximum of 100 characters",
      },
    ],
  };

  return fields[field]
    ?.filter(({ rule }) => rule !== "required")
    .concat(required ? fields[field][0] : []);
}

function getNameRegex(locale = window.locale) {
  const regexMap = {
    uk: /^.[a-zA-Zа-яА-ЯёЁЇїІіЄєҐґ 'ʼ`-]{1,}$/gm,
    tr: /^.[a-zA-ZÇçĞğIıİiÖöŞşÜü 'ʼ`-]{1,}$/gm,
  };

  return regexMap[locale];
}

function getEmailRegex() {
  return /^(?=^.{3,63}$)(^[A-Za-z0-9_+]+(([_\.\-\+](?=[A-Za-z0-9_+]))[a-zA-Z0-9_+]+([\-\.\+](?=[A-Za-z0-9_+]))*?)*@(\w+([\.\-](?=(\w|\d))))+[a-zA-Z]{2,6})$/;
}

export default function validation(form) {
  const validationForm = new JustValidate(form, globalConfig, setDictLocale());
  validationForm.setCurrentLocale(window.locale);

  const inputs = Array.from(validationForm.form.elements);

  inputs
    .filter((input) => input.type !== "submit" && input.dataset.field)
    .forEach((input) => {
      const validationRules = setInputsRules(input);

      if (validationRules.length) {
        input.addEventListener("input", () => {
          validationForm.revalidateField(`#${input.id}`);
        });

        validationForm.addField(`#${input.id}`, validationRules);
      }
    });

  return validationForm;
}
