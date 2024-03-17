import { PropsWithChildren } from 'react'

function AdminLayout({ children }: PropsWithChildren) {
  return (
    <main className="h-full w-full">
      <div className="mx-auto flex h-full max-w-screen-lg flex-col items-center justify-center p-10">
        {children}
      </div>
    </main>
  )
}

export default AdminLayout
