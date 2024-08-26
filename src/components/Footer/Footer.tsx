'use client'

import { contactMail, contactPhone } from '@/lib/consts'
import { Mail, Phone } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

function Footer() {
  const t = useTranslations('Navigation')
  return (
    <footer className="w-full bg-slate-800 py-6 text-neutral-50">
      <div className="mx-auto flex w-full max-w-screen-xl flex-wrap items-center justify-between gap-4 px-4">
        <div className="flex gap-4">
          <Link href="/" className="text-sm font-medium">
            © SETTUR 2024
          </Link>

          <a href={`mailto:${contactMail}`}>
            <Mail size={20} />
          </a>

          <a href={`tel:${contactPhone}`}>
            <Phone size={20} />
          </a>
        </div>

        <div className="flex gap-4 text-sm underline">
          <Link href="/terms-and-conditions">{t('terms-and-conditions')}</Link>

          <Link href="/aviso-de-privacidad">{t('privacy-policy')}</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
