import { Mail, Phone } from 'lucide-react'

function Footer() {
  return (
    <footer className="w-full bg-slate-800 py-6 text-neutral-50">
      <div className="mx-auto flex w-full max-w-screen-xl flex-wrap items-center justify-between gap-4 px-4">
        <a href="mailto:info@settur.com.mx" className="flex items-center">
          <Mail className="mr-1" size={14} />

          <span className="text-sm font-medium">info@settur.com.mx</span>
        </a>

        <a href="tel:+525531455826" className="flex items-center">
          <Phone className="mr-1" size={14} />

          <span className="text-sm font-medium">+52 5531455826</span>
        </a>

        <span className="text-sm font-medium">© SETTUR 2024</span>
      </div>
    </footer>
  )
}

export default Footer
