import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translations
import enTranslation from '../data/translations/en.json';
import frTranslation from '../data/translations/fr.json';
import esTranslation from '../data/translations/es.json';
import deTranslation from '../data/translations/de.json';
import hiTranslation from '../data/translations/hi.json';

// Supported languages
export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
];

// Map regions to languages
const regionToLanguage: Record<string, string> = {
  'US': 'en',
  'GB': 'en',
  'CA': 'en',
  'AU': 'en',
  'NZ': 'en',
  'FR': 'fr',
  'BE': 'fr',
  'CH': 'fr',
  'ES': 'es',
  'MX': 'es',
  'AR': 'es',
  'CL': 'es',
  'CO': 'es',
  'PE': 'es',
  'DE': 'de',
  'AT': 'de',
  'IN': 'hi'
};

// Detect the user's language based on browser settings and region
export const detectUserLanguage = (): string => {
  // Try getting language from navigator
  const browserLanguage = navigator.language.split('-')[0];
  
  // Try getting region from navigator
  const browserRegion = navigator.language.split('-')[1];
  
  // Check if region maps to a supported language
  if (browserRegion && regionToLanguage[browserRegion]) {
    return regionToLanguage[browserRegion];
  }
  
  // Check if browser language is supported
  if (supportedLanguages.some(lang => lang.code === browserLanguage)) {
    return browserLanguage;
  }
  
  // Default to English
  return 'en';
};

// Initialize i18next
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      es: { translation: esTranslation },
      de: { translation: deTranslation },
      hi: { translation: hiTranslation }
    },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already secures from XSS
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
