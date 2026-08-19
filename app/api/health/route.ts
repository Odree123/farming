import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'SautiFarm Kenya Agricultural Engine',
    timestamp: new Date().toISOString(),
  });
}
