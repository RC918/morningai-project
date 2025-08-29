import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from '@/i18n/request';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 驗證語言參數
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // 載入對應語言的訊息
  const messages = await getMessages(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

