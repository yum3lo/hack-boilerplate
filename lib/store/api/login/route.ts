// app/api/login/route.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // This is where you'd typically validate credentials against your backend
    // For now, we'll simulate a successful login
    if (email && password) {
      return NextResponse.json({
        error: 0,
        errorMessage: '',
        data: {
          id: 1,
          name: 'Test User',
          email: email
        }
      });
    }

    return NextResponse.json({
      error: 1,
      errorMessage: 'Invalid credentials',
      data: null
    }, { status: 400 });

  } catch (error) {
    return NextResponse.json({
      error: 1,
      errorMessage: 'Server error',
      data: null
    }, { status: 500 });
  }
}