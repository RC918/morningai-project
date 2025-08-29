import { NextResponse } from 'next/server';

export async function GET() {
  const buildId = process.env.BUILD_ID || 'local-dev';
  const commit = process.env.VERCEL_GIT_COMMIT_SHA || 'unknown';
  const buildTime = new Date().toISOString();
  
  return NextResponse.json({
    build_id: buildId,
    commit: commit.substring(0, 7),
    commit_full: commit,
    build_time: buildTime,
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
}

