// app/api/nonce/route.ts
import { NextResponse } from 'next/server';
import { noncehandler } from './nonce';

export async function GET() {
  const nonce = await noncehandler();
  return NextResponse.json({ nonce });
}
