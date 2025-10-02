import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Dynamically import all translation files into namespaces
const loadTranslations = async () => {
  const enModules = import.meta.glob('./locales/en/*.json', { eager: true });
  const frModules = import.meta.glob('./locales/fr/*.json', { eager: true });

  const resources = {
    en: {},
    fr: {},
  };

  for (const path in enModules) {
    const namespace = path.replace('./locales/en/', '').replace('.json', '');
    // Safely access the default export or the module itself
    resources.en[namespace] = (enModules[path] as any).default || enModules[path];
    console.log(`i18n: Loaded English namespace: ${namespace}`);
  }

  for (const path in frModules) {
    const namespace = path.replace('./locales/fr/', '').replace('.json', '');
    // Safely access the default export or the module itself
    resources.fr[namespace] = (frModules[path] as any).default || frModules[path];
    console.log(`i18n: Loaded French namespace: ${namespace}`);
  }

  console.log('i18n: All English resources (namespaced):', resources.en);
  console.log('i18n: All French resources (namespaced):', resources.fr);

  return resources;
};

// Initialize i18n after translations are loaded
loadTranslations().then(resources => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: 'en', // Set default language to English for consistent testing
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
      debug: true, // Set to true for debugging translation issues
      ns: Object.keys(resources.en), // Declare all loaded namespaces
      defaultNS: 'common', // Set a default namespace if most keys are in 'common.json'
    });
  console.log('i18n: i18n instance initialized successfully. Current language:', i18n.language);
}).catch(error => {
  console.error('i18n: Failed to initialize i18n:', error);
});

export default i18n;