import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translationAr from "./locale/ar.json";
import translationEn from "./locale/en.json";
import translationFr from "./locale/fr.json";
const resources = {
  en: {
    translation:translationEn
  },
  ar: {
    translation:translationAr
  },
  fr: {
    translation:translationFr 
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", 

    interpolation: {
      escapeValue: false 
    },
    react: {
      useSuspense: false,
    },
  });

  export default i18n;