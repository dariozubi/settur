import { PropsWithChildren } from 'react'

import NavigationBar from '@/components/NavigationBar'
import Footer from '@/components/Footer'
import Toaster from '@/components/Toaster'

function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <NavigationBar />
      <main className="w-full">{children}</main>
      <Footer />
      <Toaster />
    </>
  )
}

export default MainLayout
