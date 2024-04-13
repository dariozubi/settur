'use client'

import MainLayout from '@/components/MainLayout'
import Card, { CardFooter, CardHeader, CardTitle } from '../Card'
import Button from '../Button'
import { useTranslations } from 'next-intl'

export default function ErrorPage() {
  const t = useTranslations('error')
  return (
    <MainLayout>
      <section
        id="success"
        className="-mt-[108px] flex min-h-screen w-full items-center justify-center p-10"
      >
        <Card className="max-w-[300px]">
          <CardHeader>
            <CardTitle className="text-red">{t('general-error')}</CardTitle>
          </CardHeader>
          <CardFooter>
            <Button asChild>
              <a href="/">{t('return-home')}</a>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </MainLayout>
  )
}
