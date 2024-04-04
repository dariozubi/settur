'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'

import Label from '@/components/Label'
import TimePickerInput from '@/components/TimePickerInput'

interface TimePickerDemoProps {
  date: Date | undefined
  setDate: (_date: Date | undefined) => void
}

export const TimePicker = ({ date, setDate }: TimePickerDemoProps) => {
  const minuteRef = useRef<HTMLInputElement>(null)
  const hourRef = useRef<HTMLInputElement>(null)
  const t = useTranslations('form.DatePicker')

  return (
    <div className="flex items-center gap-2">
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
        <Label htmlFor="hours" className="text-xs" hidden>
          {t('hours')}
        </Label>
      </div>
      :
      <div className="grid gap-1 text-center">
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
        />
        <Label htmlFor="minutes" className="text-xs" hidden>
          {t('minutes')}
        </Label>
      </div>
    </div>
  )
}
