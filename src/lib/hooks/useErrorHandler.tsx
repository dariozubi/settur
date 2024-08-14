import { toast } from '@/components/Toast'
import axios from 'axios'

export function useErrorHandler() {
  const errorHandler = (e: unknown) => {
    if (axios.isAxiosError(e)) {
      toast({
        title: 'Error',
        description: (
          <p className="mt-2 w-[340px] whitespace-pre-line rounded-md p-4 text-red-500">
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
