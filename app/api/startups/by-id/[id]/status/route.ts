import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import Startup from '@/models/Startup.model';

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();

  try {
    const { id } = params;
    const body = await req.json();
    const { status } = body;

    const updatedStartup = await Startup.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedStartup) {
      return NextResponse.json({ message: 'Startup not found' }, { status: 404 });
    }

    return NextResponse.json(updatedStartup, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating status' }, { status: 500 });
  }
}