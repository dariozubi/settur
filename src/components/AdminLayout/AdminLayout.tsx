import { PropsWithChildren } from 'react'
import Toaster from '../Toaster'
import { getServerSession } from 'next-auth'
import LogoutButton from '../LogoutButton'
import Link from 'next/link'

async function AdminLayout({ children }: PropsWithChildren) {
  const session = await getServerSession()
  const isAdmin = session?.user?.image === 'ADMIN'

  return (
    <>
      <main className="h-full w-full">
        <div className="mx-auto flex h-full max-w-screen-lg flex-col gap-4 p-4">
          <div className="flex w-full items-center justify-between border-b py-2">
            <div className="flex items-center">
              <p className="font-extrabold">{`${session?.user?.name}`}</p>

              {isAdmin && (
                <div className="items ml-4 flex h-full items-center gap-4 border-l py-2 pl-4">
                  <Link href="/admin/traslados" className="underline">
                    Traslados
                  </Link>

                  <Link href="/admin/operacion" className="underline">
                    Operación
                  </Link>

                  <Link href="/admin/ordenes" className="underline">
                    Ordenes
                  </Link>

                  <Link href="/admin/precios" className="underline">
                    Precios
                  </Link>
                </div>
              )}
            </div>

            <LogoutButton />
          </div>
          {children}
        </div>
      </main>
      <Toaster />
    </>
  )
}

export default AdminLayout
