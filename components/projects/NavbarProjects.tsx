'use client'
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react'
import DisplayTRM from './DisplayTRM';
import { Menubar, MenubarContent, MenubarItem, MenubarLabel, MenubarMenu, MenubarTrigger } from '../ui/menubar';
import { Menu } from 'lucide-react';

export default function NavbarProjects () {
  const scrollableDivRef = useRef(null);
  const [headerPosition, setHeaderPosition] = useState<'normal' | 'responsive'>('normal');

  useEffect(() => {
    if(scrollableDivRef.current) {
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          if (entry.target === scrollableDivRef.current) {
            const { width } = entry.contentRect
            if(width <= 630 && headerPosition === 'normal') {
              setHeaderPosition('responsive');
            } else if (width > 630 && headerPosition === 'responsive') {
              setHeaderPosition('normal');
            }
          }
        }
      })
  
      resizeObserver.observe(scrollableDivRef.current);

      return () => {
        resizeObserver.disconnect();
      }
    }
  }, [headerPosition]);

  return (
    <header
      id='navbar-projects'
      ref={scrollableDivRef}
      className='absolute hidden bg-white shadow-md md:flex pt-2 px-4 pb-4 right-0 left-0'
    >
      <nav className='flex gap-3 w-full justify-between'>
        { headerPosition === 'normal' ?
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
          : null
        }
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
          { headerPosition === 'responsive' ?
            <Menubar className='border-0 p-0 h-min'>
              <MenubarMenu >
                <MenubarTrigger className='p-0 border-2 rounded-md border-primary-600 '>
                  <Menu className='h-4 w-4 text-primary-600 cursor-pointer m-1' />
                </MenubarTrigger>
                <MenubarContent>
                  { MENU_OPTIONS.map(({ name, url }) => 
                    <MenubarItem asChild key={name}>
                      <a
                        href={url}
                        className='text-sm text-primary-600 !hover:text-primary-800 font-medium cursor-pointer transition-colors ease-in'
                      >
                        {name}
                      </a>
                    </MenubarItem>
                  )}
                  <MenubarLabel>
                    <DisplayTRM />
                  </MenubarLabel>
                </MenubarContent>
              </MenubarMenu>
            </Menubar> 
            : <DisplayTRM />
          }
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