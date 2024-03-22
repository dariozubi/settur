import { NextResponse } from 'next/server'

import prisma from '@/db'

export async function GET() {
  try {
    const rates = await prisma.rate.findMany()
    return Response.json({ rates })
  } catch (e) {
    return new NextResponse(`Prisma error: ${e}`, { status: 400 })
  }
}
