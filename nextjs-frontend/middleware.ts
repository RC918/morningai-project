import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'zh-TW', 'zh-CN'],
  defaultLocale: 'en',
  localeDetection: true,          // 依 Accept-Language/cookie 自動偵測
  alternateLinks: false
});

export const config = {
  // 排除靜態與 API
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|version.json|healthz).*)']
};

