'use client';

import { useLanguage } from '@/contexts/language-context';
import { getTranslation, getTranslations, TranslationKey } from '@/lib/i18n';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey, fallback?: string): string => {
    return getTranslation(language, key, fallback);
  };

  const translations = getTranslations(language);

  return {
    t,
    translations,
    language,
  };
}
