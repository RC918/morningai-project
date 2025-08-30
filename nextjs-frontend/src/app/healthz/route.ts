import { NextResponse } from 'next/server';

export async function GET() {
  const healthData = {
    ok: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development',
    build_id: process.env.BUILD_ID || 'local-dev',
    service: 'morningai-frontend'
  };
  
  return NextResponse.json(healthData);
}

