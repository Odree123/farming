import { NextResponse } from 'next/server';

const VALID_OTPS = ['2541', '1234'];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone, otp } = body;

    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 });
    }

    if (!VALID_OTPS.includes(otp)) {
      return NextResponse.json({ error: 'Invalid OTP' }, { status: 401 });
    }

    const farmer = {
      phone,
      name: 'Wanjiku Mwangi',
      county: 'Uasin Gishu (Eldoret)',
      farmSizeAcres: 3.5,
      primaryCrops: ['Maize', 'Beans', 'Tomatoes'],
      livestock: ['Dairy Cow', 'Poultry'],
      preferredLanguage: 'sw',
      isAuthenticated: true,
      token: `sautifarm_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`,
    };

    return NextResponse.json({
      success: true,
      message: 'OTP verified successfully',
      token: farmer.token,
      farmer,
    });
  } catch (error: any) {
    console.error('Error in /api/auth/verify:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP', details: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
