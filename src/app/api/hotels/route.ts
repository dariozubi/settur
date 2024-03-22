import { NextResponse } from 'next/server'

import prisma from '@/db'

export async function GET() {
  try {
    const hotels = await prisma.hotel.findMany()
    return Response.json({ hotels })
  } catch (e) {
    return new NextResponse(`Prisma error: ${e}`, { status: 400 })
  }
}
