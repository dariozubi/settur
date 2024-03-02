import Image from 'next/image'
import Text from '@/components/Text'

import { PropsWithChildren } from 'react'
import { twJoin } from 'tailwind-merge'

const Card = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <div
      className={twJoin(
        'bg-light flex  flex-col items-center rounded-xl px-5 py-12',
        className
      )}
    >
      {children}
    </div>
  )
}

const Header = ({
  children,
  from,
  className,
}: PropsWithChildren<{ from: string; className?: string }>) => (
  <Text
    from={from}
    variant="lg"
    className={twJoin(' text-center font-bold', className)}
  >
    {children}
  </Text>
)

const Content = ({
  children,
  from,
  className,
}: PropsWithChildren<{ from: string; className?: string }>) => (
  <Text from={from} className={className}>
    {children}
  </Text>
)

const ImageBlock = ({
  className,
  src,
  alt,
}: {
  className: string
  src: string
  alt: string
}) => {
  return (
    <div className={twJoin('relative w-full', className)}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
        sizes="(max-width: 1280px) 100vw, 33vw"
      />
    </div>
  )
}

Card.Image = ImageBlock
Card.Header = Header
Card.Content = Content

export default Card
