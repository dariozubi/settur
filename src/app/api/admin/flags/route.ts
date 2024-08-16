import prisma from '@/db'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const session = await getServerSession()
  if (session?.user?.image === 'ADMIN') {
    try {
      const { value, id } = await request.json()
      if (id && value !== undefined) {
        const flag = await prisma.flag.update({
          where: { id },
          data: { value },
        })
        return Response.json({ flag })
      } else {
        return new NextResponse('Flags missing data', { status: 400 })
      }
    } catch (e) {
      return new NextResponse('Flags API Error', { status: 400 })
    }
  } else {
    return new NextResponse('You are not authorized to do this', {
      status: 401,
    })
  }
}
