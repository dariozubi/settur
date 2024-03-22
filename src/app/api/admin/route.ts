import { NextResponse } from 'next/server'

import prisma from '@/db'
import { getNewAdminSchema } from '@/lib/schemas'

const schema = getNewAdminSchema()

export async function POST(request: Request) {
  try {
    const req = await request.json()
    const parsedResponse = schema.safeParse(req)

    if (!parsedResponse.success) {
      const { errors } = parsedResponse.error
      const error = errors.reduce(
        (p, c, i) =>
          `${p}- ${c.path} (${c.code}): ${c.message}${i === errors.length - 1 ? '' : '\n'}`,
        'Parse error:\n'
      )
      return new NextResponse(error, { status: 400 })
    }

    try {
      const order = await prisma.admin.create({ data: req })
      return Response.json({ order })
    } catch (e) {
      return new NextResponse(`Prisma error: ${e}`, { status: 400 })
    }
  } catch (e) {
    return new NextResponse('JSON error', { status: 400 })
  }
}

export async function GET() {
  try {
    const admins = await prisma.admin.findMany()
    return Response.json({ admins })
  } catch (e) {
    return new NextResponse(`Prisma error: ${e}`, { status: 400 })
  }
}
