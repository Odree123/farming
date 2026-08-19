import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { phone, amount, productIds } = body;

    if (!phone || !amount) {
      return NextResponse.json({ error: 'Phone and amount are required' }, { status: 400 });
    }

    const merchantRequestID = `MR_${Date.now()}`;
    const checkoutRequestID = `CR_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

    return NextResponse.json({
      success: true,
      message: 'STK Push sent successfully',
      merchantRequestID,
      checkoutRequestID,
      phone,
      amount,
      productIds: productIds || [],
      status: 'pending',
      providerRef: `STK_${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      expiry: new Date(Date.now() + 300000).toISOString(),
    });
  } catch (error: any) {
    console.error('Error in /api/mpesa/stkpush:', error);
    return NextResponse.json(
      { error: 'Failed to initiate STK push', details: error?.message || 'Server error' },
      { status: 500 }
    );
  }
}
