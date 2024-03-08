import { NavigationBlock } from './NavigationBlock'
import Text from '../Text'

function NavigationBar() {
  return (
    <NavigationBlock
      contact={
        <Text variant="sm" from="Navigation">
          contact
        </Text>
      }
      about={
        <Text variant="sm" from="Navigation">
          about
        </Text>
      }
    />
  )
}

export default NavigationBar
