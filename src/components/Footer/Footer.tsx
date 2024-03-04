import { IoCallSharp, IoMailOutline } from 'react-icons/io5'
import Text from '../Text'

function Footer() {
  return (
    <footer className="w-full bg-dark py-6">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between">
        <a href="mailto:info@settur.com.mx" className="flex items-center">
          <IoMailOutline className="mr-1 text-light" />
          <Text variant="sm" as="span" className="text-light">
            info@settur.com.mx
          </Text>
        </a>

        <a href="tel:+525531455826" className="flex items-center">
          <IoCallSharp className="mr-1 text-light" />
          <Text variant="sm" as="span" className="text-light">
            +52 5531455826
          </Text>
        </a>

        <Text variant="sm" className="text-light">
          © SETTUR 2024
        </Text>
      </div>
    </footer>
  )
}

export default Footer
