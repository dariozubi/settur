import Skeleton from '../Skeleton'

function LoadingPage() {
  return (
    <main className="h-screen w-full">
      <div className="mx-auto flex max-w-screen-xl flex-col justify-between px-4">
        <div className="flex w-full justify-end gap-4 pt-2">
          <Skeleton className="h-6 w-[80px]" />
          <Skeleton className="h-6 w-[80px]" />
          <Skeleton className="h-6 w-[80px]" />
        </div>
      </div>
    </main>
  )
}

export default LoadingPage
