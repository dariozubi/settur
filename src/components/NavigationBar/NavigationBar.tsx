import { Link } from '@/navigation'
import Text from '../Text'
import { LanguageSelector } from './LanguageSelector'

function NavigationBar() {
  return (
    <nav className="absolute flex w-full justify-end px-20 py-5">
      <ul className="flex gap-7">
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
