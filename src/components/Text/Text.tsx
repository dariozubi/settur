import { useTranslations } from 'next-intl'
import { PropsWithChildren } from 'react'

type Props = {
  from: string
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'span'
  isRichText?: boolean
  variant?: Variants
}

type Variants = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'

const baseClassNames: Record<Variants | 'text', string> = {
  xxl: 'text-4xl font-extrabold',
  xl: 'text-3xl font-extrabold lg:text-6xl',
  lg: 'text-2xl font-extrabold lg:text-3xl',
  md: 'text-2xl font-bold lg:text-3xl',
  text: 'text-base lg:text-xl',
  sm: 'text-sm lg:text-base',
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
  return (
    <Tag className={`${baseClassNames[variant || 'text']} ${className}`}>
      {typeof children === 'string'
        ? isRichText
          ? t.rich(children, {
              br: () => <br />,
            })
          : t(children)
        : children}
    </Tag>
  )
}

export default Text
