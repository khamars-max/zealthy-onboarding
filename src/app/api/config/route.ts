import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import { Config } from '@/lib/models';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { step2, step3 } = await req.json();

  const config = await Config.findOneAndUpdate(
    {},
    { step2, step3 },
    { upsert: true, new: true }
  );

  return NextResponse.json(config);
}

export async function GET() {
  await dbConnect();
  const config = await Config.findOne().lean();
  return NextResponse.json(config);
}
