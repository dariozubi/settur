import LoginSection from '@/components/LoginSection'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

async function Page() {
  const session = await getServerSession()
  if (session?.user) redirect('/admin/servicios')

  return (
    <main className="h-full w-full">
      <div className="mx-auto flex h-full max-w-screen-lg flex-col items-center justify-center gap-8 p-10">
        <LoginSection />
      </div>
    </main>
  )
}

export default Page
