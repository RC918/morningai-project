'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'zh-CN', name: '简体中文' },
];

export function LanguageSelector() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // 移除當前語言前綴並添加新的語言前綴
    const pathWithoutLocale = pathname.replace(/^\/(en|zh-TW|zh-CN)(?=\/|$)/, '');
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`;
    
    // 使用型別斷言繞過 typedRoutes（暫時方案）
    router.push(newPath);
  };

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <div className="relative group">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center space-x-2"
        aria-label="選擇語言"
      >
        <Globe className="h-4 w-4" />
        <span>{currentLanguage?.name}</span>
      </Button>
      
      {/* 下拉選單 */}
      <div className="absolute right-0 top-full mt-1 bg-white dark:bg-gray-800 border rounded-md shadow-lg z-10 hidden group-hover:block">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            disabled={lang.code === locale}
          >
            {lang.name}
          </button>
        ))}
      </div>
    </div>
  );
}

