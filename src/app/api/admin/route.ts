import prisma from '@/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const admins = await prisma.admin.findMany()
    return Response.json({ admins })
  } catch (e) {
    return new NextResponse(`Prisma error: ${e}`, { status: 400 })
  }
}
