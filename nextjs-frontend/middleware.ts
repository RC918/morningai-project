import createMiddleware from 'next-intl/middleware';
import { locales } from './src/i18n';

export default createMiddleware({
  locales,
  defaultLocale: 'en',
  localeDetection: true,          // 依 Accept-Language/cookie 自動偵測
  alternateLinks: false
});

export const config = {
  // 排除靜態與 API
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|version.json|healthz).*)']
};

