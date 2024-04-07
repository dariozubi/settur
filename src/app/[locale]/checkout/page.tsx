import MainLayout from '@/components/MainLayout'
import StripeCheckoutPage from '@/components/StripeCheckoutPage'
import prisma from '@/db'

async function CheckoutPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const order = await prisma.order.findUnique({
    select: { rates: true, id: true, isReserve: true },
    where: {
      id: Number(searchParams.orderId),
    },
  })
  return (
    <MainLayout>
      <StripeCheckoutPage order={order} />
    </MainLayout>
  )
}
export default CheckoutPage
