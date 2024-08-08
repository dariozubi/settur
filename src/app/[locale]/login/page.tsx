import LoginSection from '@/components/LoginSection'
import Toaster from '@/components/Toaster'
import { getServerSession } from 'next-auth'

async function Page() {
  const session = await getServerSession()
  return (
    <>
      <main className="h-full w-full">
        <div className="mx-auto flex h-full max-w-screen-lg flex-col items-center justify-center gap-8 p-10">
          <LoginSection session={session} />
        </div>
      </main>
      <Toaster />
    </>
  )
}

export default Page
