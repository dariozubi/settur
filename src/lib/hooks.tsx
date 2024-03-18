import { toast } from '@/components/Toast'
import axios from 'axios'
import { useLocale } from 'next-intl'

export function useIsEnglish() {
  const locale = useLocale()
  return locale === 'en'
}

export function useErrorHandler() {
  const errorHandler = (e: unknown) => {
    if (axios.isAxiosError(e)) {
      toast({
        title: 'Error',
        description: (
          <p className="mt-2 w-[340px] whitespace-pre-line rounded-md bg-slate-950 p-4 text-red-500">
            {e.response?.data}
          </p>
        ),
      })
    } else {
      console.error(e)
    }
  }
  return errorHandler
}
