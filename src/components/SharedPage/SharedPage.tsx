import { useSharedFormLabels } from './useSharedFormLabels'
import SharedForm from '../SharedForm'

function SharedPage() {
  const labels = useSharedFormLabels()
  return (
    <section className="w-full bg-neutral-50">
      <div className="mx-auto w-full max-w-screen-xl pb-20 pt-10">
        <SharedForm labels={labels} />
      </div>
    </section>
  )
}

export default SharedPage
