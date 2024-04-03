import Image from 'next/image';
import React from 'react'
import DisplayTRM from './DisplayTRM';

export default function NavbarProjects () {
  return (
    <header
      className='absolute hidden bg-white shadow-md md:flex pt-2 px-4 pb-4 right-0 left-0'
    >
      <nav className='flex gap-3 w-full justify-between'>
        <div className='flex-1 flex items-end gap-3'>
          {
            MENU_OPTIONS.map(({ name, url }) => (
              <a
                key={name}
                href={url}
                className='text-xs 2xl:text-sm text-primary-600 hover:text-primary-800 font-semibold cursor-pointer transition-colors ease-in'
              >
                {name}
              </a>
            ))
          }
        </div>
        <a href='/'>
          <Image
            unoptimized
            width='107'
            height='60'
            className='w-[120px] md:w-[90px] xl:w-[107px] 2xl:w-[120px] cursor-pointer'
            src='/main-page/inverclick-logo.avif'
            alt='Inverclick logo'
          />
        </a>
        <div className='flex-1 gap-3 flex justify-end items-end !text-xs !2xl:text-sm'>
          <DisplayTRM />
          <a className='border-2 border-primary-600 rounded-full cursor-pointer hover:scale-105 transition-all ease-in' href='/'>
            <Image 
              unoptimized
              width='25'
              height='25'
              src='/main-page/user.svg'
              alt='Inverclick logo'
            />
          </a>  
        </div>
      </nav>
    </header>
  )
}

const MENU_OPTIONS = [
  { name: 'Nosotros', url: '/' },
  { name: 'Financiación', url: '/' },
  { name: 'Otros servicios', url: '/' },
];