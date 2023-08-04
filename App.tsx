import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import xhrBackend from 'i18next-xhr-backend';
import 'intl-pluralrules';
import Navigator from './src/Navigator'; // Import your Navigator component
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook

// Import your translation files
import en from './src/locales/en.json';
import fr from './src/locales/fr.json';

i18n
  .use(xhrBackend)
  .init({
    lng: 'en', // Set the default language
    fallbackLng: 'en', // Fallback language if the current language doesn't have a translation
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      // Add more languages here as needed
    },
  });

const App: React.FC = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <Navigator />
    </I18nextProvider>
  );
};

export default App;
