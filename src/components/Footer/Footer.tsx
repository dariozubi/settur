import { Mail, Phone } from 'lucide-react'
import Text from '../Text'

function Footer() {
  return (
    <footer className="w-full py-6">
      <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between">
        <a href="mailto:info@settur.com.mx" className="flex items-center">
          <Mail className="mr-1" size={14} />

          <Text variant="sm" as="span">
            info@settur.com.mx
          </Text>
        </a>

        <a href="tel:+525531455826" className="flex items-center">
          <Phone className="mr-1" size={14} />

          <Text variant="sm" as="span">
            +52 5531455826
          </Text>
        </a>

        <Text variant="sm">© SETTUR 2024</Text>
      </div>
    </footer>
  )
}

export default Footer
