import formDictLocale from "../../json/formDictLocale.json";

function setFormDictLocale(locale) {
  return formDictLocale.map(({ key, dict }) => {
    if (!dict[locale]) {
      throw new Error(
        `No locale found for ${locale}. Please add it to the formDictLocale.json file.`,
      );
    }
    return { key, msg: dict[locale] };
  });
}

export default function translateMessage(key, locale = window.locale) {
  const message = setFormDictLocale(locale).find(
    ({ key: k }) => k === key,
  )?.msg;
  if (!message) {
    throw new Error(`No message found for key ${key}`);
  }
  return message;
}
