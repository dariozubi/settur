import { PropsWithChildren } from 'react'
import Toaster from '../Toaster'

function AdminLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="h-full w-full">
        <div className="mx-auto flex h-full max-w-screen-lg flex-col gap-8 p-4">
          {children}
        </div>
      </main>
      <Toaster />
    </>
  )
}

export default AdminLayout
