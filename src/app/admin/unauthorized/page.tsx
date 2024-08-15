import { OctagonAlert } from 'lucide-react'
import Link from 'next/link'

async function Page() {
  return (
    <>
      <main className="h-full w-full">
        <div className="mx-auto flex h-full max-w-screen-lg flex-col items-center justify-center gap-8 p-10">
          <section className="flex flex-col gap-4 rounded border border-stone-400 bg-white p-20">
            <div className="mb-4 flex items-center gap-2">
              <OctagonAlert size={40} />

              <h1 className="text-4xl">Acceso denegado</h1>
            </div>
            <span>Este correo no está autorizado para ingresar.</span>
            <Link
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-stone-200 bg-white py-4 text-xl font-bold ring-offset-white transition-colors hover:bg-stone-100 hover:text-stone-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:border-stone-800 dark:bg-stone-950 dark:ring-offset-stone-950 dark:hover:bg-stone-800 dark:hover:text-stone-50 dark:focus-visible:ring-stone-300"
              href="/admin/login"
            >
              Ingresar
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}

export default Page
