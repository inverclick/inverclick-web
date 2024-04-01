import { DisplayFormattedCurrency } from '@/components/shared/DisplayFormattedCurrency';
import { Heart, Home, MapPinned, Share } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { SelectCurrency } from '../SelectCurrency';
import { ProjectGallery } from './ProjectGallery';

interface Props {
  name: string;
  photos: string[];
  price: number
  department: string;
  city: string;
  address: string;
}

export const Hero = ({name, department, city, address, price, photos}: Props) => {
  return (
    <section className='flex flex-col gap-4 md:gap-6 xl:gap-8'>

      {/* Breadcrumb */}
      <div className='text-xs md:text-sm flex gap-2 mb-3 md:mb-4 xl:mb-5'>
        <Link href='/' className='hover:text-primary-800 hover:underline transition-all ease-in flex gap-1'>
          <Home className='w-[14px] h-[14px] md:w-4 md:h-4' />
          Home
        </Link>
        <span>/</span>
        <Link href='/projects' className='hover:text-primary-800 hover:underline transition-all ease-in'>Proyectos</Link>
        <span>/</span>
        <span className='text-primary-600'>{name}</span>
      </div>

      {/* Título */}
      <div className='flex flex-col-reverse md:flex-row justify-between gap-6 md:items-center'>
        <h1 className='text-3xl md:text-4xl xl:text-5xl font-semibold'>{name}</h1>
        <div className='flex flex-col md:flex-row gap-3 md:gap-6 md:items-center'>
          <span className='flex gap-2 text-sm md:text-base underline hover:text-primary-600 transition-colors ease-in cursor-pointer'>
            <Share className='w-4 h-4 md:w-5 md:h-5' />
            Compartir
          </span>
          <span className='flex gap-2 text-sm md:text-base underline hover:text-primary-600 transition-colors ease-in cursor-pointer'>
            <Heart className='w-4 h-4 md:w-5 md:h-5' />
            Guardar
          </span>
          <SelectCurrency />
        </div>
      </div>

      {/* Fotos */}
      <ProjectGallery photos={photos} />

      {/* Info */}
      <div className='flex flex-col md:flex-row justify-between gap-4 px-6'>
        <span className='flex gap-3 items-center text-sm md:text-base font-extralight max-w-xl'>
          <MapPinned className='text-primary-600 min-w-6 min-h-6 md:w-8 md:h-8' />
          {department}, {city} / {address}
        </span>
        <span className='flex gap-4 md:gap-6 text-base md:text-lg items-center'>
          Desde:
          <DisplayFormattedCurrency className='text-2xl md:text-3xl xl:text-4xl font-medium' number={price}  />
        </span>
      </div>
    </section>
  )
}
