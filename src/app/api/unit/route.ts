import prisma from '@/db'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const session = await getServerSession()
  if (session?.user?.image === 'ADMIN') {
    try {
      const { label, vehicle, id } = await request.json()
      if (label && vehicle) {
        if (id) {
          const unit = await prisma.unit.update({
            where: { id },
            data: { label, vehicle },
          })
          return Response.json({ unit })
        } else {
          const unit = await prisma.unit.create({ data: { label, vehicle } })
          return Response.json({ unit })
        }
      } else {
        return new NextResponse('Unit missing data', { status: 400 })
      }
    } catch (e) {
      return new NextResponse('Unit API Error', { status: 400 })
    }
  } else {
    return new NextResponse('You are not authorized to do this', {
      status: 401,
    })
  }
}
