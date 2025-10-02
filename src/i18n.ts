import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Dynamically import all translation files
const loadTranslations = async () => {
  const enModules = import.meta.glob('./locales/en/*.json', { eager: true });
  const frModules = import.meta.glob('./locales/fr/*.json', { eager: true });

  const resources = {
    en: {},
    fr: {},
  };

  for (const path in enModules) {
    const key = path.replace('./locales/en/', '').replace('.json', '');
    Object.assign(resources.en, enModules[path].default);
  }

  for (const path in frModules) {
    const key = path.replace('./locales/fr/', '').replace('.json', '');
    Object.assign(resources.fr, frModules[path].default);
  }

  console.log('Loaded English resources:', resources.en);
  console.log('Loaded French resources:', resources.fr);

  return resources;
};

// Initialize i18n after translations are loaded
loadTranslations().then(resources => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'fr', // default language
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
      debug: false, // Set to true for debugging translation issues
    });
});

export default i18n;