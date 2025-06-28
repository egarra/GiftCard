// v3.0.0

import cookie from "./modules/cookie";
import formHandler from "./modules/form-handler";
import service from "./modules/service";

window.addEventListener("load", async function () {
  // document.querySelectorAll("[data-link]").forEach((link) => {
  //   link.href = `${link.href}${window.location.search}`;
  // });

  /* Array of form configurations */
  const formsArray = [
    {
      formId: "modalForm",
      // productName: window.productName,
      // productId: window.productId,
    },
  ];

  /* Sets the default locale if it's not defined */
  if (!window.locale) {
    window.locale = "uk";
    console.info(
      `ℹ️ [window.locale] is not defined, setting to [${window.locale}]`,
    );
  }

  /* Retrieves and sets the user's IP information */
  window.ipData = await service.getIpInfo();

  /* Saves UTM parameters to cookies */
  cookie.saveUrlParamsToCookie();

  /* Initializes form validation and submission for each form */
  await Promise.all(formsArray.map(formHandler));
});
