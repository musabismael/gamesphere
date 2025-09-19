'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, supportedLanguages, isRTL, getFontClass, getTranslation, TranslationKey } from '@/lib/i18n';

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  isRTL: boolean;
  fontClass: string;
  t: (key: TranslationKey, fallback?: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');

  useEffect(() => {
    // Get language from localStorage or browser preference
    const savedLanguage = localStorage.getItem('language') as SupportedLanguage;
    if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
      if (supportedLanguages.includes(browserLang)) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  const setLanguage = (newLanguage: SupportedLanguage) => {
    setLanguageState(newLanguage);
    localStorage.setItem('language', newLanguage);
    
    // Update document attributes
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = isRTL(newLanguage) ? 'rtl' : 'ltr';
    document.documentElement.className = document.documentElement.className
      .replace(/font-\w+/g, '')
      .trim() + ` ${getFontClass(newLanguage)}`;
  };

  useEffect(() => {
    // Apply language settings when language changes
    document.documentElement.lang = language;
    document.documentElement.dir = isRTL(language) ? 'rtl' : 'ltr';
    document.documentElement.className = document.documentElement.className
      .replace(/font-\w+/g, '')
      .trim() + ` ${getFontClass(language)}`;
  }, [language]);

  const t = (key: TranslationKey, fallback?: string): string => {
    return getTranslation(language, key, fallback);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    isRTL: isRTL(language),
    fontClass: getFontClass(language),
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
