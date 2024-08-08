import prisma from '@/db'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()
    const admins = await prisma.admin.findMany()
    const admin = admins.find(admin => admin.email === email)
    return Response.json({ isAdmin: !!admin })
  } catch (e) {
    return new NextResponse(`Prisma error: ${e}`, { status: 400 })
  }
}
