import { Link } from '@/navigation'
import Text from '../Text'
import { LanguageSelector } from './LanguageSelector'

function NavigationBar() {
  return (
    <nav className="absolute z-50 w-full">
      <ul className="jusitfy-end  mx-auto flex w-full max-w-screen-xl justify-end gap-7 px-5 py-5 xl:px-0">
        <li>
          <Link href="/">
            <Text from="Navigation">contact</Text>
          </Link>
        </li>
        <li>
          <Link href="/">
            <Text from="Navigation">about</Text>
          </Link>
        </li>
        <li>
          <LanguageSelector />
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBar
