import { useTranslations } from 'next-intl'
import { PropsWithChildren } from 'react'

type Props = {
  from?: string
  className?: string
  variant?: keyof typeof variants
} & React.HTMLProps<HTMLButtonElement>

const variants = {
  primary: 'bg-primary text-light',
}

function Button({
  children,
  from,
  variant,
  className,
  type,
  ...rest
}: PropsWithChildren<Props>) {
  const t = useTranslations(from)
  return (
    <button
      type={type as 'button' | 'submit' | 'reset' | undefined}
      {...rest}
      className={`${className} ${variants[variant || 'primary']} shadow-brand rounded-xl px-7 py-3 font-bold`}
    >
      {typeof children === 'string' && !!from ? t(children) : children}
    </button>
  )
}

export default Button
