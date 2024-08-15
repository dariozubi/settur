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
      <main className="w-full h-full">
        <div className="flex flex-col h-full max-w-screen-lg gap-4 p-4 mx-auto">
          <div className="flex items-center justify-between w-full py-2 border-b">
            <div className="flex items-center">
              <p>
                Hola{' '}
                <span className="font-extrabold">{session?.user?.name}</span>
              </p>

              {isAdmin && (
                <div className="flex items-center h-full gap-4 py-2 pl-4 ml-4 border-l items">
                  <a href="/servicios" className="underline">
                    Servicios
                  </a>

                  <Link href="/dashboard" className="underline">
                    Administración
                  </Link>

                  <Link href="/precios" className="underline">
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
