import ReceiptPage from '@/components/ReceiptPage'
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

  return (
    <ReceiptPage
      status={session?.status || null}
      orderId={session?.metadata.order_id || null}
    />
  )
}

export default Receipt
