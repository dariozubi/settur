import { useTranslations } from 'next-intl'
import { PropsWithChildren } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

type Props = {
  from?: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'span'
  isRichText?: boolean
  variant?: Variants
}

type Variants = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

const baseClassNames: Record<Variants | 'text', string> = {
  xxl: 'text-4xl',
  xl: 'text-3xl',
  lg: 'text-2xl',
  md: 'text-xl',
  text: 'text-base',
  sm: 'text-sm',
  xs: 'text-xs',
}

function Text({
  from,
  as,
  className,
  children,
  isRichText,
  variant,
}: PropsWithChildren<Props>) {
  const t = useTranslations(from)
  const Tag = as || 'p'
  const finalClassName = twMerge(
    twJoin(baseClassNames[variant || 'text'], 'text-dark'),
    className
  )
  return (
    <Tag className={finalClassName}>
      {typeof children === 'string' && !!from
        ? isRichText
          ? t.rich(children, {
              br: () => <br />,
              b: m => <span className="font-extrabold">{m}</span>,
            })
          : t(children)
        : children}
    </Tag>
  )
}

export default Text
