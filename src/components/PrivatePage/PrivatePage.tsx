import PrivateForm from '@/components/PrivateForm'
import { useFormLabels } from '@/lib/hooks/useFormLabels'
import { useTranslations } from 'next-intl'
import { useMemo } from 'react'

function PrivatePage() {
  const t = useTranslations('form')
  const formLabels = useFormLabels()
  const labels = useMemo(
    () => ({
      ...formLabels,
      vehicle: t('vehicle'),
    }),
    [formLabels, t]
  )
  return (
    <section className="w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl pb-20 pt-10">
        <PrivateForm labels={labels} />
      </div>
    </section>
  )
}

export default PrivatePage
