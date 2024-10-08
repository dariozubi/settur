import { MailCheck } from 'lucide-react'

export default function Page() {
  return (
    <main className="h-full w-full">
      <div className="mx-auto flex h-full max-w-screen-lg flex-col items-center justify-center gap-8 p-10">
        <section className="flex flex-col items-center gap-1 rounded border border-stone-800 bg-white p-10">
          <MailCheck size={56} />
          <h1 className="my-4 text-4xl">Ve a tu correo</h1>
          <h2 className="text-center text-lg">
            Un link para iniciar sesión fue enviado a tu correo electrónico
            <br />
            Puedes cerrar esta ventanta
          </h2>
        </section>
      </div>
    </main>
  )
}
