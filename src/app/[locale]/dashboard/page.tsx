import { getServerSession } from 'next-auth'
import LogoutButton from '@/components/LogoutButton'
import AdminLayout from '@/components/AdminLayout'
import AdminServices from '@/components/AdminServices'
// import prisma from '@/db'

export default async function Page() {
  const session = await getServerSession()
  // if (!session?.user?.name && session?.user?.email) {
  //   const admin = await prisma.admin.findUnique({
  //     where: { email: session.user.email },
  //   })
  //   const prismaUser = await prisma.user.findUnique({
  //     where: { email: session.user.email },
  //   })
  //   if (!!admin && !!prismaUser) {
  //     await prisma.user.update({
  //       where: { email: session.user.email },
  //       data: { image: admin.role, name: admin.name },
  //     })
  //   }
  // }
  return (
    <AdminLayout>
      <div className="flex w-full items-center justify-between">
        <p>
          Hola <span className="font-extrabold">{session?.user?.name}</span>
        </p>
        <LogoutButton />
      </div>
      <div className="flex w-full gap-2">
        <AdminServices />
      </div>
    </AdminLayout>
  )
}
