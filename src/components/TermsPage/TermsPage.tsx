'use client'

import { useTranslations } from 'next-intl'

function TermsPage() {
  const t = useTranslations('terms-and-conditions')
  return (
    <section className="min-h-screen w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-20">
        <h1 className="mb-8 text-xl font-extrabold">{t('title')}</h1>
        <div>
          {t.rich('terms', {
            br: () => <br />,
            h2: m => <h2 className="mb-1 text-lg font-bold">{m}</h2>,
            h3: m => <h3 className="text-normal font-bold">{m}</h3>,
          })}
        </div>
      </div>
    </section>
  )
}

export default TermsPage
