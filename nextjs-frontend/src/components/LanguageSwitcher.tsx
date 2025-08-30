'use client';

import {useParams, usePathname, useRouter} from 'next/navigation';
import {useMemo} from 'react';

const LANGS = [
  {code: 'en', label: 'EN'},
  {code: 'zh-TW', label: '繁中'},
  {code: 'zh-CN', label: '简中'}
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const locale = (params?.locale as string) ?? 'en';

  const onChange = (newLocale: string) => {
    // 簡單的語言切換，替換 URL 中的語言部分
    const segments = pathname.split('/');
    segments[1] = newLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  const current = useMemo(
    () => LANGS.find(l => l.code === locale)?.label ?? 'EN',
    [locale]
  );

  return (
    <select
      aria-label="language"
      value={locale}
      onChange={(e) => onChange(e.target.value)}
      className="appearance-none bg-transparent border border-border-primary rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-border-focus"
    >
      {LANGS.map(l => (
        <option key={l.code} value={l.code}>{l.label}</option>
      ))}
    </select>
  );
}

