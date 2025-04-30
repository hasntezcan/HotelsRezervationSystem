import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en/translation.json';
import trTranslation from './locales/tr/translation.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    resources: {
      en: { translation: enTranslation },
      tr: { translation: trTranslation },
    },
    detection: {
      // localStorage’dan önce bunu dene:
      order: ['localStorage'],
      // hangi anahtar(lar)ı kullanacağını söyle:
      lookupLocalStorage: ['selectedLanguage'],
      // hangi anahtara yazacağını söyle:
      caches: ['localStorage'],
    },
  });

export default i18n;
