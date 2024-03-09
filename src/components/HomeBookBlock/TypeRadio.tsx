import { useTranslations } from 'next-intl'
import { Label } from '../ui/label'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

export const TypeRadio = () => {
  const t = useTranslations('Home')
  return (
    <div className="mx-auto flex max-w-[300px] justify-center">
      <RadioGroup defaultValue="private">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="private" id="private" />
          <Label htmlFor="private">{t('private')}</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="shared" id="shared" />
          <Label htmlFor="shared">{t('shared')}</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
