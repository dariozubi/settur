'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/Button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute top-3 left-4'
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 absolute top-3 right-4'
        ),
        caption_label: 'text-sm font-medium',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        disabled: 'text-stone-500 opacity-50 dark:text-stone-400',
        hidden: 'invisible',
        months: 'flex flex-col space-y-4 sm:space-y-0',
        month: 'space-y-4',
        month_caption: 'flex justify-center pt-1 relative items-center',
        month_grid: 'w-full border-collapse space-y-1',
        nav: 'flex w-full items-center z-10',
        outside:
          'day-outside text-stone-500 opacity-50 aria-selected:bg-stone-100/50 aria-selected:text-stone-500 aria-selected:opacity-30 dark:text-stone-400 dark:aria-selected:bg-stone-800/50 dark:aria-selected:text-stone-400',
        range_middle:
          'aria-selected:bg-stone-100 aria-selected:text-stone-900 dark:aria-selected:bg-stone-800 dark:aria-selected:text-stone-50',
        range_end: 'day-range-end',
        selected:
          'bg-stone-900 text-stone-50 hover:bg-stone-900 hover:text-stone-50 focus:bg-stone-900 focus:text-stone-50 dark:bg-stone-50 dark:text-stone-900 dark:hover:bg-stone-50 dark:hover:text-stone-900 dark:focus:bg-stone-50 dark:focus:text-stone-900',
        today:
          'bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-50',
        week: 'flex w-full',
        weekdays: 'flex',
        weekday:
          'text-stone-500 rounded-md w-9 font-normal text-[0.8rem] dark:text-stone-400',
        ...classNames,
      }}
      components={{
        Chevron: props => {
          if (props.orientation === 'left')
            return <ChevronLeft className="h-4 w-4" />
          else return <ChevronRight className="h-4 w-4" />
        },
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export default Calendar
