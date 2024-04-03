import '@/app/styles/animations.css'
import Image from 'next/image'
import React from 'react'

export const ContactButton = () => {
  return (
    <div className='z-30 border-2 border-primary-600 slide-button shadow-2xl cursor-pointer absolute bottom-6 right-4 rounded-full'>
      <Image
        unoptimized
        className='object-cover'
        src='/main-page/contact.svg'
        height='36'
        width='36'
        alt='Inverclick - contacto'
      />
      <span>Contáctenos</span>
    </div>
  )
}
