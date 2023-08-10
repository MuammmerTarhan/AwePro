import React, { useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import xhrBackend from 'i18next-xhr-backend';
import Navigator from './src/Navigator'; // Import your Navigator component
import { useTranslation } from 'react-i18next'; // Import the useTranslation hook
import OneSignal from 'react-native-onesignal'; // Import OneSignal

// Import your translation files
import en from './src/locales/en.json';
import fr from './src/locales/fr.json';

// Initialize i18n
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

//  useEffect(() => {
    // Initialize OneSignal with your OneSignal App ID
//    OneSignal.setLogLevel(6, 0); // Verbose level for debugging
//    OneSignal.setAppId('cbeb50d3-1f72-4dc8-a111-6fa09ef071af'); // Set your OneSignal App ID
//  }, []);

  return (
    <I18nextProvider i18n={i18n}>
      <Navigator />
    </I18nextProvider>
  );
};

export default App;
