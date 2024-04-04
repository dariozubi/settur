'use client'

import { useState } from 'react'
import { addMonths, format } from 'date-fns'
import { es, enUS } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useIsEnglish } from '@/lib/hooks/useIsEnglish'
import Button from '@/components/Button'
import Calendar from '@/components/Calendar'
import Popover, { PopoverContent, PopoverTrigger } from '@/components/Popover'
import {
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/Form'
import { TimePicker } from './TimePicker'
import { SelectSingleEventHandler } from 'react-day-picker'
import { useTranslations } from 'next-intl'

export type Props = {
  label: string
  onChange: (_d?: Date) => void
  value: Date
  limitDate?: Date
}

function DatePicker({ label, value, onChange, limitDate }: Props) {
  const isEnglish = useIsEnglish()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const t = useTranslations('form.DatePicker')

  const handleOnSelect: SelectSingleEventHandler = (d?: Date) => {
    onChange(d)
    setIsPopoverOpen(false)
  }
  return (
    <FormItem className="flex flex-col">
      <FormLabel className="font-bold">{label}</FormLabel>
      <div className="flex items-center gap-2">
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={'outline'}
                className={cn(
                  'flex w-[240px] items-center pl-3 text-left font-normal',
                  !value && 'text-muted-foreground'
                )}
              >
                {value ? (
                  <span className="mr-2">
                    {format(value, 'PPP', {
                      locale: isEnglish ? enUS : es,
                    })}
                  </span>
                ) : (
                  <span className="mr-2">{t('pick-date')}</span>
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <TimePicker setDate={onChange} date={value} />
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={value}
              onSelect={handleOnSelect}
              disabled={date => {
                const now = limitDate || new Date()
                const last = addMonths(now, 6)
                return date < now || date > last
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <FormMessage />
    </FormItem>
  )
}

export default DatePicker
