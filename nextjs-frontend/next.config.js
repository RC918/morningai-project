const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 禁用靜態匯出，保留 SSR 和 API Routes
  output: undefined,
  trailingSlash: false,
  
  // 國際化配置
  experimental: {
    typedRoutes: false, // 暫時關閉以快速通過 Phase 2 建置
  },
  
  // 環境變數
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://8002-ilfns8thhpkdgk0bkmmax-03809667.manusvm.computer',
    BUILD_ID: process.env.VERCEL_GIT_COMMIT_SHA || 'local-dev',
  },
  
  // 重寫規則 - API 代理
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'https://8002-ilfns8thhpkdgk0bkmmax-03809667.manusvm.computer'}/api/:path*`,
      },
    ];
  },
  
  // 標頭配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

module.exports = withNextIntl(nextConfig);

