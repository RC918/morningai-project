import { NextResponse } from 'next/server';

export async function GET() {
  const buildId = process.env.BUILD_ID || process.env.VERCEL_GIT_COMMIT_SHA || 'local-dev';
  const version = process.env.npm_package_version || '1.0.0';
  
  return NextResponse.json({
    version,
    buildId,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    phase: 'Phase 1 - Infrastructure Setup'
  });
}

