import { PropsWithChildren } from 'react'
import Toaster from '../Toaster'

function AdminLayout({ children }: PropsWithChildren) {
  return (
    <>
      <main className="h-full w-full">
        <div className="mx-auto flex h-full max-w-screen-lg flex-col items-center justify-center gap-8 p-10">
          {children}
        </div>
      </main>
      <Toaster />
    </>
  )
}

export default AdminLayout
