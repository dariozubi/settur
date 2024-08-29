import { PropsWithChildren } from 'react'
import Toaster from '../Toaster'
import { getServerSession } from 'next-auth'
import LogoutButton from '../LogoutButton'
import Link from 'next/link'

async function AdminLayout({ children }: PropsWithChildren) {
  const session = await getServerSession()
  const isOperacion = session?.user?.image === 'OPERACION'

  const links = isOperacion
    ? [
        { label: 'Traslados', link: '/admin/traslados' },
        { label: 'Operación', link: '/admin/operacion' },
      ]
    : [
        { label: 'Traslados', link: '/admin/traslados' },
        { label: 'Operación', link: '/admin/operacion' },
        { label: 'Órdenes', link: '/admin/ordenes' },
        { label: 'Precios', link: '/admin/precios' },
      ]

  return (
    <>
      <main className="h-full w-full">
        <div className="mx-auto flex h-full max-w-screen-lg flex-col gap-4 p-4">
          <div className="flex w-full items-center justify-between border-b py-2">
            <div className="flex items-center">
              <Link
                href="/"
                className="w-[70px] text-ellipsis text-center font-extrabold"
              >{`${session?.user?.name}`}</Link>

              <div className="items mx-2 flex h-full max-w-[calc(100vw-180px)] items-center gap-4 overflow-auto border-l py-2 pl-2 sm:ml-4 sm:mr-0 sm:max-w-full sm:pl-4">
                {links.map(l => (
                  <Link href={l.link} key={l.link} className="underline">
                    {l.label}
                  </Link>
                ))}
              </div>
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
