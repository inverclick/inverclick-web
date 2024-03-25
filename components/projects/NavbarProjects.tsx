import Image from 'next/image';
import React from 'react'
import DisplayTRM from './DisplayTRM';

export default function NavbarProjects () {
  return (
    <header
      className='absolute hidden bg-white shadow-md md:flex pt-2 pb-4 right-0 left-0'
    >
      <nav className='flex justify-around items-end w-full'>
        <a href='/'>
          <Image
            unoptimized
            width='160'
            height='80'
            className='w-[120px] md:w-[120px] xl:w-[140px] cursor-pointer'
            src='/main-page/inverclick-logo.avif'
            alt='Inverclick logo'
          />
        </a>
        {
          MENU_OPTIONS.map(({ name, url }) => (
            <a
              key={name}
              href={url}
              className='text-xs xl:text-sm text-primary-600 hover:text-primary-800 font-medium cursor-pointer transition-colors ease-in'
            >
              {name}
            </a>
          ))
        }
        <DisplayTRM />
      </nav>
    </header>
  )
}

const MENU_OPTIONS = [
  { name: 'Nosotros', url: '/' },
  { name: 'Financiación', url: '/' },
  { name: 'Otros servicios', url: '/' },
];