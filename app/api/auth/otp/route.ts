import { NextResponse } from 'next/server';
import { FarmerProfile } from '@/src/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone } = body;

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'OTP sent successfully',
      otp: '2541',
      phone,
    });
  } catch (error: any) {
    console.error('Error in /api/auth/otp:', error);
    return NextResponse.json(
      { error: 'Failed to send OTP', details: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
