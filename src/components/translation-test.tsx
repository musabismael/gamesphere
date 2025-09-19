'use client';

import { useLanguage } from '@/contexts/language-context';
import { Button } from '@/components/ui/button';

export function TranslationTest() {
  const { t, language, setLanguage, isRTL } = useLanguage();

  return (
    <div className="p-4 border rounded-lg bg-slate-800">
      <h3 className="text-lg font-semibold mb-4">Translation Test</h3>
      
      <div className="space-y-2 mb-4">
        <p><strong>Current Language:</strong> {language}</p>
        <p><strong>RTL Mode:</strong> {isRTL ? 'Yes' : 'No'}</p>
        <p><strong>Welcome Message:</strong> {t('home.title')}</p>
        <p><strong>Description:</strong> {t('home.description')}</p>
        <p><strong>Games Link:</strong> {t('navigation.games')}</p>
        <p><strong>Search Placeholder:</strong> {t('games.searchPlaceholder')}</p>
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={() => setLanguage('en')}
          variant={language === 'en' ? 'default' : 'outline'}
          size="sm"
        >
          English
        </Button>
        <Button 
          onClick={() => setLanguage('ar')}
          variant={language === 'ar' ? 'default' : 'outline'}
          size="sm"
        >
          العربية
        </Button>
      </div>
    </div>
  );
}
