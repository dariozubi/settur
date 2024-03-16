'use client'

import { useRef } from 'react'
import { Clock } from 'lucide-react'

import Label from '@/components/Label'
import TimePickerInput from '@/components/TimePickerInput'
import type { Props } from './DatePicker'

interface TimePickerDemoProps {
  date: Date | undefined
  setDate: (_date: Date | undefined) => void
  labels: Props['labels']
}

export const TimePicker = ({ date, setDate, labels }: TimePickerDemoProps) => {
  const minuteRef = useRef<HTMLInputElement>(null)
  const hourRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex items-end gap-2">
      <div className="grid gap-1 text-center">
        <Label htmlFor="hours" className="text-xs">
          {labels.hours}
        </Label>
        <TimePickerInput
          picker="hours"
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
        />
      </div>
      <div className="grid gap-1 text-center">
        <Label htmlFor="minutes" className="text-xs">
          {labels.minutes}
        </Label>
        <TimePickerInput
          picker="minutes"
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
        />
      </div>
      <div className="flex h-10 items-center">
        <Clock className="ml-2 h-4 w-4" />
      </div>
    </div>
  )
}
