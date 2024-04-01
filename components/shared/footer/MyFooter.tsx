import Link from 'next/link'
import { SignupNewsletter } from './SignupNewsletter'
import Image from 'next/image'
import { SOCIAL_NETWORKS } from '../data/socialNetworks'

export const MyFooter = () => {
  return (
    <footer className='bg-gray-200 flex flex-col gap-6 md:gap-8 xl:gap-10 px-6 py-16 md:py-20'>
      <section className='grid grid-cols-1 md:grid-cols-3 justify-items-center gap-4'>
        <div className='w-full'>
          <SignupNewsletter />
        </div>
        <div className='w-full md:w-auto flex flex-col gap-4 md:gap-6'>
        { FIRST_LINKS.map( ({href, label}) => 
          <Link 
            key={label} 
            href={href}
            className='text-base md:text-lg hover:underline'
          >
            {label}
          </Link>
        )}
        </div>
        <div className='w-full flex flex-col gap-4 md:gap-6'>
        { SECOND_LINKS.map( ({href, label}) => 
          <Link 
            key={label} 
            href={href}
            className='text-base md:text-lg hover:underline'
          >
            {label}
          </Link>
        )}
        </div>
      </section>
      <div className='grid grid-cols-1 md:grid-cols-3 items-center justify-items-center md:justify-items-start gap-5'>  
        <div className='flex gap-4'>
          {
            SOCIAL_NETWORKS.map(({ link, img, name }) => (
              <a key={link} href={link} aria-label={link} target='_blank'>
                <Image
                  unoptimized
                  className='aspect-square hover:shadow-2xl hover:scale-105 transition-all ease-in cursor-pointer w-7 h-7 md:w-9 md:h-9'
                  src={img}
                  width='36'
                  height='36'
                  alt={name}
                />
              </a>
            ))
          }
        </div>
        <div className='text-black flex flex-col gap-2 justify-center items-center'>
          <Image
            unoptimized
            width='200'
            height='80'
            className='w-[160px] md:w-[220px] mix-blend-multiply'
            src='/main-page/inverclick-logo.avif'
            alt='Inverclick logo'
          />
          <div
            className='flex gap-4 font-light text-xs md:text-sm text-center'
          >
            Políticas de privacidad
            <div className='border-r border-black' />
            Términos y condiciones
          </div>
          <div className='flex gap-4 font-light text-xs md:text-sm'>
            All rights reserved © {new Date().getFullYear()}
          </div>
        </div>
        <div className='justify-self-end'>
          <Image
            unoptimized
            className='bottom-5 right-8 object-cover shadow-2xl hidden md:block self-end hover:scale-105 transition-all ease-in cursor-pointer'
            src='/main-page/download_app.svg'
            width='40'
            height='80'
            alt='Inverclick descarga la app'
          />
        </div>
      </div>
    </footer>
  )
}

const FIRST_LINKS = [
  { label: 'Nosotros', href: '/' },
  { label: 'Financiación', href: '/' },
  { label: 'Otros servicios', href: '/' },
]

const SECOND_LINKS = [
  { label: 'Simulador de crédito', href: '/' },
  { label: 'Trabaja con nosotros', href: '/' },
  { label: 'Contacto', href: '/' },
]
