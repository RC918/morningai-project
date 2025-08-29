import createMiddleware from 'next-intl/middleware';
import { locales } from './i18n';

export default createMiddleware({
  // 支援的語言列表
  locales,
  
  // 預設語言
  defaultLocale: 'zh-TW',
  
  // 語言偵測策略
  localeDetection: true,
  
  // 路徑名稱本地化
  pathnames: {
    '/': '/',
    '/dashboard': {
      'en': '/dashboard',
      'zh-TW': '/dashboard',
      'zh-CN': '/dashboard'
    }
  }
});

export const config = {
  // 匹配所有路徑除了 API routes, _next/static, _next/image, favicon.ico
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};

