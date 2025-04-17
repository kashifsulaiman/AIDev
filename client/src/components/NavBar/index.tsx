'use client';
import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { IoCloseOutline } from 'react-icons/io5';
import {
  // Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  // NavbarMenuToggle,
} from '@nextui-org/react';
import { CButton } from '@/common/button';
import { usePathname, useRouter } from 'next/navigation';
import GenericImage from '@/common/GenericImage';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const ContacthandleClick = () => {
    router.push('/log-in');
  };

  const menuItems = [
    { label: 'About us', href: '/about-us' },
    { label: 'Contact us', href: '/contact-us' },
    { label: 'Policy', href: '/privacy-policy' },
    { label: 'pricing plan', href: '/pricing-plan' },
  ];

  return (
    <Navbar
      isBordered
      className="relaive z-10 my-4 max-w-[1619px] border-none bg-transparent px-4 md:h-[70px] 2xl:mx-auto"
      classNames={{
        base: 'md:h-[70px] border-none border-divider-none backdrop-none px-0 relative z-10 bg-transparent backdrop-saturate-100',
        wrapper: 'max-w-none px-0 w-full',
      }}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <div className="flex w-full items-center justify-between gap-6">
        <NavbarBrand className="h-10 w-20 max-w-20">
          <a href="/">
            <GenericImage
              className="size-full object-cover"
              alt="logo"
              src="https://dc3yp5a9dizw2.cloudfront.net/images/aidev-logo.svg"
            />
          </a>
        </NavbarBrand>
        <NavbarContent className="hidden gap-6 min-[1320px]:flex" justify="end">
          {menuItems.map((item) => (
            <NavbarItem
              key={item.label}
              isActive={pathname === item.href}
              className="group"
            >
              <Link
                className="w-full border-b-1 border-transparent font-Jakarta font-medium hover:border-[#9B1BB9] hover:!text-[#9B1BB9] group-data-[active=true]:!text-[#9B1BB9]"
                color="foreground"
                href={item.href}
                size="md"
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent className="flex !flex-grow-0 items-center">
          <CButton
            className="rounded-[100px] border !border-[#376EE7] px-6 py-2.5 font-Jakarta text-base font-medium text-white"
            label="Try For Free"
            onClick={ContacthandleClick}
          />
          {/* <NavbarMenuToggle
            className="text-black min-[1320px]:hidden"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          /> */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="bg-transparent text-black min-[1320px]:hidden"
            aria-label={'Open menu'}
          >
            <FiMenu size={24} />
          </button>
        </NavbarContent>
      </div>

      <NavbarMenu className="navbar-height !h-screen !px-4">
        <div className="my-5 flex items-center justify-between">
          <a href="/" className="w-20">
            <GenericImage
              className="object-cover"
              alt="logo"
              src="https://dc3yp5a9dizw2.cloudfront.net/images/aidev-logo.svg"
            />
          </a>
          <div className="flex items-center gap-4">
            <CButton
              className="rounded-[100px] border !border-[#376EE7] px-6 py-2.5 font-Jakarta text-base font-medium text-white"
              label="Try For Free"
              onClick={ContacthandleClick}
            />
            <button
              onClick={() => setIsMenuOpen(false)}
              className="bg-transparent text-black min-[1320px]:hidden"
              aria-label={'Close menu'}
            >
              <IoCloseOutline size={24} />
            </button>
          </div>
        </div>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={item.label}>
            <Link
              className="w-full"
              color={
                index === 2
                  ? 'foreground'
                  : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
              }
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
