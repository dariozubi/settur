import { useEffect } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { PrivateForm, PrivateFormLabels } from '../PrivateForm/types'

export function useVehicleIndividualsValidation({
  individuals,
  form,
  labels,
}: {
  individuals: number
  form: UseFormReturn<PrivateForm>
  labels: Pick<PrivateFormLabels, 'error'>
}) {
  const vehicle = form.watch('vehicle')

  useEffect(() => {
    if (individuals > 17) {
      form.setError('vehicle', {
        type: 'custom',
        message: labels.error.tooManyPeople,
      })
    } else {
      form.clearErrors()
    }

    if (individuals > 10) {
      if (
        vehicle === 'escalade' ||
        vehicle === 'suburban' ||
        vehicle === 'hiace'
      ) {
        form.setValue('vehicle', 'sprinter')
      }
    } else if (individuals > 6) {
      if (vehicle === 'escalade' || vehicle === 'suburban') {
        form.setValue('vehicle', 'hiace')
      }
    } else if (individuals > 5) {
      if (vehicle === 'escalade') {
        form.setValue('vehicle', 'suburban')
      }
    }
  }, [form, individuals, labels.error.tooManyPeople, vehicle])
}