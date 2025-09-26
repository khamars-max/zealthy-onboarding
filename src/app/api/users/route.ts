// import { NextRequest, NextResponse } from 'next/server';
// import bcrypt from 'bcryptjs';
// import { dbConnect } from '@/lib/dbConnect';
// import { User } from '@/lib/models';

// export async function POST(req: NextRequest) {
//   await dbConnect();
//   const body = await req.json();

//   const { email, password, ...rest } = body;
//   const passwordHash =
//     password && password.length ? await bcrypt.hash(password, 10) : undefined;

//   const user = await User.findOneAndUpdate(
//     { email },
//     {
//       ...(passwordHash ? { passwordHash } : {}),
//       ...rest,
//     },
//     { upsert: true, new: true }
//   );

//   return NextResponse.json(user);
// }

// export async function GET(req: NextRequest) {
//   await dbConnect();
//   const email = new URL(req.url).searchParams.get('email');

//   const query = email ? { email } : {};
//   const users = await User.find(query).lean();

//   return NextResponse.json(users);
// }
import { NextRequest, NextResponse } from 'next/server';
import { dbConnect } from '@/lib/dbConnect';
import { User } from '@/lib/models';
import bcrypt from 'bcryptjs';

export async function GET(req: NextRequest) {
  await dbConnect();
  const email = req.nextUrl.searchParams.get('email');
  if (!email) return NextResponse.json([]);
  const users = await User.find({ email }).lean();
  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  await dbConnect();
  const body = await req.json();
  const { _id, password, email, onboardingStep, ...rest } = body;
  const passwordHash =
    password && password.length ? await bcrypt.hash(password, 10) : undefined;
  const update: Record<string, any> = { ...rest, onboardingStep };
  if (passwordHash) update.passwordHash = passwordHash;
  const user = await User.findOneAndUpdate(
    { email },
    { $set: update },
    { new: true, upsert: true }
  );
  return NextResponse.json(user);
}

