import prisma from '@/db'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const session = await getServerSession()
  if (session?.user?.image === 'ADMIN') {
    try {
      const { value, priceId, id } = await request.json()
      if (value && priceId && id) {
        const operator = await prisma.rate.update({
          where: { id },
          data: { value, priceId },
        })
        return Response.json({ operator })
      } else {
        return new NextResponse('Operator missing data', { status: 400 })
      }
    } catch (e) {
      return new NextResponse('Operator API Error', { status: 400 })
    }
  } else {
    return new NextResponse('You are not authorized to do this', {
      status: 401,
    })
  }
}
