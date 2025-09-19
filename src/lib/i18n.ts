export type SupportedLanguage = 
  | 'en' 
  | 'ar' 
  | 'ja' 
  | 'ko' 
  | 'zh-CN' 
  | 'zh-TW' 
  | 'th' 
  | 'hi' 
  | 'he' 
  | 'ka' 
  | 'hy';

export const supportedLanguages: SupportedLanguage[] = [
  'en', 'ar', 'ja', 'ko', 'zh-CN', 'zh-TW', 'th', 'hi', 'he', 'ka', 'hy'
];

export const languageNames: Record<SupportedLanguage, string> = {
  'en': 'English',
  'ar': 'العربية',
  'ja': '日本語',
  'ko': '한국어',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  'th': 'ไทย',
  'hi': 'हिन्दी',
  'he': 'עברית',
  'ka': 'ქართული',
  'hy': 'Հայերեն'
};

export const languageFonts: Record<SupportedLanguage, string> = {
  'en': 'font-english',
  'ar': 'font-arabic',
  'ja': 'font-japanese',
  'ko': 'font-korean',
  'zh-CN': 'font-chinese-simplified',
  'zh-TW': 'font-chinese-traditional',
  'th': 'font-thai',
  'hi': 'font-hindi',
  'he': 'font-hebrew',
  'ka': 'font-georgian',
  'hy': 'font-armenian'
};

export const rtlLanguages: SupportedLanguage[] = ['ar', 'he'];

export function isRTL(language: SupportedLanguage): boolean {
  return rtlLanguages.includes(language);
}

export function getFontClass(language: SupportedLanguage): string {
  return languageFonts[language] || 'font-english';
}

// Translation system
export type TranslationKey = string;
export type TranslationObject = Record<string, any>;

// Import translation files
import enTranslations from './translations/en.json';
import arTranslations from './translations/ar.json';

const translations: Record<SupportedLanguage, TranslationObject> = {
  'en': enTranslations,
  'ar': arTranslations,
  'ja': enTranslations, // Fallback to English for now
  'ko': enTranslations, // Fallback to English for now
  'zh-CN': enTranslations, // Fallback to English for now
  'zh-TW': enTranslations, // Fallback to English for now
  'th': enTranslations, // Fallback to English for now
  'hi': enTranslations, // Fallback to English for now
  'he': enTranslations, // Fallback to English for now
  'ka': enTranslations, // Fallback to English for now
  'hy': enTranslations, // Fallback to English for now
};

export function getTranslation(
  language: SupportedLanguage,
  key: TranslationKey,
  fallback?: string
): string {
  const keys = key.split('.');
  let value: any = translations[language] || translations['en'];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Fallback to English if key not found
      value = translations['en'];
      for (const fallbackKey of keys) {
        if (value && typeof value === 'object' && fallbackKey in value) {
          value = value[fallbackKey];
        } else {
          return fallback || key;
        }
      }
      break;
    }
  }
  
  return typeof value === 'string' ? value : (fallback || key);
}

export function getTranslations(language: SupportedLanguage): TranslationObject {
  return translations[language] || translations['en'];
}