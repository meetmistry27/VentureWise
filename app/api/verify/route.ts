// app/api/verify/route.ts
import { NextResponse } from 'next/server';
import { verifyTokenLogic } from './verify';

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization');
  const token = authHeader?.startsWith('Bearer ')
    ? authHeader.split(' ')[1]
    : '';

  const result = await verifyTokenLogic(token);
  return NextResponse.json(result.body, { status: result.status });
}
