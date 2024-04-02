import '@/app/styles/animations.css'
import Image from 'next/image'
import React from 'react'

export const LoginButton = () => {
  return (
    <div className='z-30 slide-button border-2 border-primary-600 shadow-2xl cursor-pointer absolute bottom-20 right-4 rounded-full'>
      <Image
        unoptimized
        className='object-cover'
        src='/main-page/user.svg'
        height='36'
        width='36'
        alt='Inverclick - ingresar'
      />
      <span>Ingresar</span>
    </div>
  )
}
