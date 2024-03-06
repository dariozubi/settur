'use client'

import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import { IoCallSharp, IoChevronDown, IoMailOutline } from 'react-icons/io5'
import { ReactNode } from 'react'
import Image from 'next/image'

type Props = {
  contact: ReactNode
  mail: ReactNode
  phone: ReactNode
  about: ReactNode
  languageSelector: ReactNode
}

export const NavbarRoot = ({
  contact,
  mail,
  phone,
  about,
  languageSelector,
}: Props) => {
  return (
    <Navbar shouldHideOnScroll maxWidth="xl" className="-mt-[64px]">
      <NavbarBrand>
        <div className="relative aspect-[978/182] min-h-[32px]">
          <Image
            src="/img/logo.png"
            alt="image"
            fill
            className="object-cover"
            sizes="(max-width: 1280px) 100vw, 50vw"
            priority={true}
          />
        </div>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>{languageSelector}</NavbarItem>

        <NavbarItem>
          <Button href="/" as={Link} variant="light">
            {about}
          </Button>
        </NavbarItem>

        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button endContent={<IoChevronDown />} variant="light">
                {contact}
              </Button>
            </DropdownTrigger>
          </NavbarItem>

          <DropdownMenu aria-label="Contact menu">
            <DropdownItem>
              <Link
                href="mailto:info@settur.com.mx"
                className="flex items-center"
                isExternal
              >
                <IoMailOutline className="mr-1" />
                {mail}
              </Link>
            </DropdownItem>

            <DropdownItem>
              <Link
                href="tel:+525531455826"
                className="flex items-center"
                isExternal
              >
                <IoCallSharp className="mr-1 " />
                {phone}
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}
