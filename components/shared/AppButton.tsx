import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const AppButton = () => {
  return (
    <Link href="/app" className='hidden md:block absolute bottom-5 right-8 z-30 slide-app-button cursor-pointer drop-shadow-2xl animate-tada animate-delay-800'>
      <Image
        unoptimized
        className=' object-cover shadow-2xl'
        src='/main-page/download_app.svg'
        width='40'
        height='80'
        alt='Inverclick descarga la app'
      />
      <span className="ml-2">&nbsp;&nbsp;Descarga&nbsp;nuestra&nbsp;app&nbsp;&nbsp;</span>
    </Link>
  )
}
