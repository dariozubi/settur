import prisma from '@/db'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const session = await getServerSession()
  if (session) {
    try {
      const { transferId, unitId } = await request.json()
      if (transferId && unitId) {
        const transfer = await prisma.transfer.update({
          where: { id: transferId },
          data: { unit: { connect: { id: unitId } } },
          include: { unit: true },
        })
        return Response.json({ unit: transfer.unit })
      } else {
        return new NextResponse('Transfer missing data', { status: 400 })
      }
    } catch (e) {
      return new NextResponse('Transfer API Error', { status: 400 })
    }
  } else {
    return new NextResponse('You are not authorized to do this', {
      status: 401,
    })
  }
}
