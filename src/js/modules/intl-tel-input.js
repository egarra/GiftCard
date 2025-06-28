import intlTelInput from "intl-tel-input";
import { uk, tr } from "intl-tel-input/i18n";

export default function initIntlTelInput(phone) {
  // https://intl-tel-input.com/
  // https://github.com/jackocnr/intl-tel-input/blob/master/README.md#initialisation-options

  const iti = intlTelInput(phone, {
    countryOrder: ["ua"],
    excludeCountries: ["ru", "by"],
    i18n: { uk, tr }[window.locale],
    initialCountry:
      window.ipData?.country_code || { uk: "ua", tr: "tr" }[window.locale],
    separateDialCode: false,
    strictMode: true,
    useFullscreenPopup: false,
    loadUtils: () => import("intl-tel-input/utils"),
  });

  const selectedCountryButton = phone.parentNode.querySelector(
    ".iti__selected-country",
  );
  const initialAriaLabel = selectedCountryButton.getAttribute("aria-label");

  function updateItiAriaLabel() {
    const selectedCountry = iti.getSelectedCountryData();

    selectedCountryButton.setAttribute(
      "aria-label",
      `${initialAriaLabel}: ${selectedCountry.name}`,
    );
  }

  updateItiAriaLabel();

  phone.addEventListener("countrychange", updateItiAriaLabel);

  return iti;
}
