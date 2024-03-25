'use client'
import { useCurrencyContext } from '@/contexts/CurrencyContext'
import { currencyFormatter } from '@/lib/currencyFormatter'
import type { IBLUEPRINT_POPULATED } from '@/types/blueprint'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface Props {
  blueprint: IBLUEPRINT_POPULATED
}

export const ProjectCard = ({blueprint}: Props) => {
  const [isMounted, setIsMounted] = useState(false)
  const { convert, currency } = useCurrencyContext()
  const { project } = blueprint
  const { company } = project

  useEffect(() => {
    setIsMounted(true)
  } ,[])

  if(!isMounted) return null

  return (
    <section className='flex flex-col w-[280px] shadow-2xl rounded-lg h-full'>
      <div className='relative'>
        <Image unoptimized loading='lazy' src={project.photos[0]} alt={project.name} width={290} height={200} className='rounded-t-lg h-[170px] w-full object-cover'  />
        <div className={`absolute top-0 left-0 text-[10px] text-white rounded-tl-lg px-2 py-1 capitalize font-semibold bg-green-600`}>{blueprint.state}</div>
        <div className={`absolute top-0 right-0 text-[10px] text-white rounded-tr-lg px-2 py-1 capitalize font-semibold bg-sky-600`}>{blueprint.type}</div>
      </div>
      <div className='pt-4 flex flex-1 flex-col gap-[6px] justify-between bg-white rounded-b-lg'>
        <div className='px-4 flex gap-2 items-center'>
          <Image unoptimized loading='lazy' className='w-auto h-[50px]' src={company.logo_url} alt={project.name} width={60} height={60} />
          <div>
            <p className='text-base font-semibold'>{project.name}</p>
            <p className='text-xs font-medium mt-1'>{project.department}, {project.city}</p>
          </div>
        </div>
        <p className='px-4 text-xs mt-2'>{project.address}</p>
        <div className='py-3 px-4 gap-2 flex items-center text-sm'>
          <p className='font-medium'>Desde:</p>
          <p className='text-sm'>
            { currencyFormatter(convert(blueprint.price), currency)} {currency}
          </p>
        </div>
        <div className='flex justify-between p-4 bg-slate-200 rounded-b-lg'>
          <div className='text-xs text-center'>
            <p>{blueprint.area} <span className='text-xs'>m<sup>2</sup></span></p>
            <p className='font-semibold'>Área</p>
          </div>
          <div className='text-xs text-center'>
            <p >{blueprint.rooms}</p>
            <p className='font-semibold'>Habitaciones</p>
          </div>
          <div className='text-xs text-center'>
            <p >{blueprint.bathrooms}</p>
            <p className='font-semibold'>Baños</p>
          </div>
          <div className='text-xs text-center'>
            <p >{blueprint.units}</p>
            <p className='font-semibold'>Unidades</p>
          </div>
        </div>
      </div>
    </section>
  )
}
