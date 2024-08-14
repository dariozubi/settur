import prisma from '@/db'
import { getServerSession } from 'next-auth/next'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const session = await getServerSession()

  if (session) {
    const req = await request.json()

    if (req.fn === 'addTransferUnit') {
      try {
        const { transferId, unitId } = req
        if (transferId && unitId) {
          const transfer = await prisma.transfer.update({
            where: { id: transferId },
            data: { unit: { connect: { id: unitId } } },
            include: { unit: true },
          })
          return Response.json({ unit: transfer.unit })
        } else {
          return new NextResponse('Transfer unit missing data', { status: 400 })
        }
      } catch (e) {
        return new NextResponse('Prisma transfer error', { status: 400 })
      }
    }

    if (req.fn === 'updateUnit' && session?.user?.image === 'ADMIN') {
      try {
        const { label, vehicle, id } = req
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
          return new NextResponse('Update unit missing data', { status: 400 })
        }
      } catch (e) {
        return new NextResponse('Prisma unit error', { status: 400 })
      }
    }
  }

  return new NextResponse('You are not authorized', {
    status: 401,
  })
}
