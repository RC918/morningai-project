import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// 支援的語言
export const locales = ['en', 'zh-TW', 'zh-CN'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // 驗證語言是否支援
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
    timeZone: 'Asia/Taipei',
    now: new Date(),
  };
});

