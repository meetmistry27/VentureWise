import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect'; // Your MongoDB connection file
import Startup from '@/models/Startup.model'; // Adjust path as needed

// PUT request to update startup by ID
// export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     await dbConnect();

//     const startupId = params.id;
//     const updatedData = await req.json();

//     const updatedStartup = await Startup.findByIdAndUpdate(startupId, {
//       $set: updatedData,
//     }, { new: true, runValidators: true });

//     if (!updatedStartup) {
//       return NextResponse.json({ message: 'Startup not found' }, { status: 404 });
//     }

//     return NextResponse.json(updatedStartup, { status: 200 });
//   } catch (error) {
//     console.error('Error updating startup:', error);
//     return NextResponse.json({ message: 'Server error', error }, { status: 500 });
//   }
// }
function toCamelCase(obj: any) {
  const newObj: any = {};
  for (const key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
    newObj[camelKey] = obj[key];
  }
  return newObj;
}


export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();

    const startupId = params.id;
    console.log(" ihih" + startupId)
    const rawData = await req.json();
    const updatedData = toCamelCase(rawData);
    console.log("meet " + JSON.stringify(updatedData, null, 2));

    updatedData.pilotPartnerships = updatedData.pilotPartnerships ? "TRUE" : "FALSE";

    const updatedStartup = await Startup.findByIdAndUpdate(
      startupId,
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    console.log("wererfs")
    if (!updatedStartup) {
      return NextResponse.json({ message: 'Startup not found' }, { status: 404 });
    }

    return NextResponse.json(updatedStartup, { status: 200 });
  } catch (error) {
    console.error('Error updating startup:', error);
    return NextResponse.json({ message: 'Server error', error }, { status: 500 });
  }
}
