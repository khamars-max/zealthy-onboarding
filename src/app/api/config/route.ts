import { NextRequest, NextResponse } from 'next/server'
import { dbConnect } from '@/lib/dbConnect'
import { Config } from '@/lib/models'

type Cfg = { step2: string[]; step3: string[] }
const DEFAULT_CFG = { step2: ['aboutMe'], step3: ['birthDate'] }

export async function GET() {
  await dbConnect()
  const raw = await Config.findOne().lean<Cfg>().exec()
  const cfg: Cfg = {
    step2: raw?.step2?.length ? raw.step2 : DEFAULT_CFG.step2,
    step3: raw?.step3?.length ? raw.step3 : DEFAULT_CFG.step3,
  }
  return NextResponse.json(cfg)
}

export async function POST(req: NextRequest) {
  await dbConnect()
  const body = (await req.json()) as Partial<Cfg>
  const step2 = body.step2?.length ? body.step2 : DEFAULT_CFG.step2
  const step3 = body.step3?.length ? body.step3 : DEFAULT_CFG.step3
  const cfg = await Config.findOneAndUpdate({}, { step2, step3 }, { new: true, upsert: true })
  return NextResponse.json(cfg)
}
