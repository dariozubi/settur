import { useFormLabels } from '@/lib/hooks/useFormLabels'
import SharedForm from '../SharedForm'

function SharedPage() {
  const labels = useFormLabels()
  return (
    <section className="w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl pb-20 pt-10">
        <SharedForm labels={labels} />
      </div>
    </section>
  )
}

export default SharedPage
