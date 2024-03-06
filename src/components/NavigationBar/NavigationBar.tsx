import Text from '../Text'
import { LanguageSelector } from './LanguageSelector'
import { NavbarRoot } from './NavbarRoot'

function NavigationBar() {
  return (
    <NavbarRoot
      contact={<Text from="Navigation">contact</Text>}
      mail={
        <Text variant="sm" as="span">
          info@settur.com.mx
        </Text>
      }
      phone={
        <Text variant="sm" as="span">
          +52 5531455826
        </Text>
      }
      about={<Text from="Navigation">about</Text>}
      languageSelector={<LanguageSelector />}
    />
  )
}

export default NavigationBar
