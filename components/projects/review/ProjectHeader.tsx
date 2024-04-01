import Image from 'next/image'
import React from 'react'
import DisplayTRM from '../DisplayTRM';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';
import { Menu } from 'lucide-react';

const MENU_OPTIONS = [
  { name: 'Nosotros', url: '/' },
  { name: 'Financiación', url: '/' },
  { name: 'Otros servicios', url: '/' },
];

export const ProjectHeader = () => {
  return (
    <header className='fixed bg-white left-0 right-0 shadow-lg px-6 pb-4 pt-3 flex items-end xl:items-center justify-between z-10'>
      <Image 
        unoptimized
        width='170'
        height='60'
        className='animate-slide-in-top w-[120px] md:w-[140px] xl:w-[170px] xl:h-[60px]'
        src='/main-page/inverclick-logo.avif'
        alt='Inverclick logo'
      />
      <DesktopMenu />
      <MobileMenu />
    </header>
  )
}

const DesktopMenu = () => (
  <div className='hidden md:flex sm:gap-6 xl:gap-8 justify-center items-center'>
  {
    MENU_OPTIONS.map(({ name, url }) => (
      <a
        key={name}
        href={url}
        className='text-xs sm:text-sm xl:text-base text-primary-600 hover:text-primary-800 font-medium cursor-pointer transition-colors ease-in'
      >
        {name}
      </a>
    ))
  }
    <DisplayTRM />
    <a className='border-2 border-primary-600 rounded-full cursor-pointer hover:scale-105 transition-all ease-in' href='/'>
      <Image 
        unoptimized
        width='30'
        height='30'
        className='animate-slide-in-top'
        src='/main-page/user.svg'
        alt='Inverclick logo'
      />
    </a>  
  </div>
)

const MobileMenu = () => (
  <div className='flex md:hidden gap-3 sm:gap-6 xl:gap-8 justify-center items-end'>
    <DisplayTRM />
    <Menubar className='border-0 p-0 h-min'>
      <MenubarMenu >
        <MenubarTrigger className='p-0 border-2 rounded-md border-primary-600 '>
          <Menu className='h-4 w-4 text-primary-600 cursor-pointer m-1 ' />
        </MenubarTrigger>
        <MenubarContent>
        { MENU_OPTIONS.map(({ name, url }) => 
          <MenubarItem asChild key={name}>
            <a
              href={url}
              className='text-sm xl:text-base text-primary-600 !hover:text-primary-800 font-medium cursor-pointer transition-colors ease-in'
            >
              {name}
            </a>
          </MenubarItem>
        )}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
    <a className='border-2 border-primary-600 rounded-full cursor-pointer hover:scale-105 transition-all ease-in' href='/'>
      <Image 
        unoptimized
        width='25'
        height='25'
        className='animate-slide-in-top'
        src='/main-page/user.svg'
        alt='Inverclick logo'
      />
    </a>  
  </div>
)