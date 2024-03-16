'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { es, enUS } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import Button from '@/components/Button'
import Calendar from '@/components/Calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useIsEnglish } from '@/lib/hooks'
import { TimePicker } from './TimePicker'

export type Props = {
  labels: {
    date: string
    pickDate: string
    hours: string
    minutes: string
  }
  onChange: () => void
  value: Date
}

function DatePicker({ labels, value, onChange }: Props) {
  const isEnglish = useIsEnglish()
  return (
    <FormItem className="flex flex-col">
      <FormLabel className="font-bold">{labels.date}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-[240px] pl-3 text-left font-normal',
                !value && 'text-muted-foreground'
              )}
            >
              {value ? (
                format(value, "PPP '-' HH':'mm", {
                  locale: isEnglish ? enUS : es,
                })
              ) : (
                <span>{labels.pickDate}</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={onChange}
            disabled={date => date < new Date()}
            initialFocus
          />
          <div className="flex justify-center border-t p-3">
            <TimePicker setDate={onChange} date={value} labels={labels} />
          </div>
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  )
}

export default DatePicker
