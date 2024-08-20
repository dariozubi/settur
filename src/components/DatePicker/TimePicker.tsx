'use client'

import { useRef } from 'react'
import Label from '@/components/Label'
import TimePickerInput from '@/components/TimePickerInput'

interface TimePickerDemoProps {
  date: Date | undefined
  setDate: (_date: Date | undefined) => void
  labels: {
    hours: string
    minutes: string
  }
}

export const TimePicker = ({ date, setDate, labels }: TimePickerDemoProps) => {
  const minuteRef = useRef<HTMLInputElement>(null)
  const hourRef = useRef<HTMLInputElement>(null)

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
          {labels.hours}
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
          {labels.minutes}
        </Label>
      </div>
    </div>
  )
}
