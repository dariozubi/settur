import PrivateForm from '@/components/PrivateForm'
import { usePrivateFormLabels } from './usePrivateFormLabels'

function PrivatePage() {
  const labels = usePrivateFormLabels()
  return (
    <section className="w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl pb-20 pt-10">
        <PrivateForm labels={labels} />
      </div>
    </section>
  )
}

export default PrivatePage
