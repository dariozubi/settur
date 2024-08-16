import StripeCheckoutPage from '@/components/StripeCheckoutPage'
import prisma from '@/db'
import { redirect } from '@/navigation'

async function CheckoutPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const flag = await prisma.flag.findUnique({ where: { id: 'IS_ACTIVE' } })
  if (!flag?.value) {
    redirect('/')
  }

  const order = searchParams.orderId
    ? await prisma.order.findUnique({
        select: { prices: true, id: true, owed: true },
        where: {
          id: Number(searchParams.orderId),
          status: 'CREATED',
        },
      })
    : null

  return <StripeCheckoutPage order={order} />
}
export default CheckoutPage
