import ErrorPage from '@/components/ErrorPage'
import ReceiptPage from '@/components/ReceiptPage'
import prisma from '@/db'
import stripe from '@/payment'

async function Receipt({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const sessionId = searchParams.session_id

  const session = await (async () => {
    if (!sessionId) return null
    try {
      const stripeSession = await stripe.checkout.sessions.retrieve(sessionId)
      return stripeSession
    } catch (e) {
      return null
    }
  })()
  if (session?.status === 'complete' && session?.metadata.order_id) {
    const order = await prisma.order.findUnique({
      where: { id: Number(session.metadata.order_id) },
      include: { hotel: true, transfers: true },
    })

    if (order) {
      return <ReceiptPage order={order} />
    }
  }

  return <ErrorPage error="receipt" />
}

export default Receipt
