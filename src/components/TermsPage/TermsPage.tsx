'use client'

import { useTranslations } from 'next-intl'

function TermsPage() {
  const t = useTranslations('terms-and-conditions')
  return (
    <section className="min-h-screen w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-20">
        <h1 className="mb-8 text-xl font-bold">{t('title')}</h1>
        <h2 className="my-4 text-lg font-bold">{t('payment')}</h2>
        <p>{t('payment-text')}</p>
        <h2 className="my-4 text-lg font-bold">{t('cancellation')}</h2>
        <p>{t('cancellation-text')}</p>
        <h2 className="my-4 text-lg font-bold">{t('changes')}</h2>
        <p>{t('changes-text')}</p>
      </div>
    </section>
  )
}

export default TermsPage
