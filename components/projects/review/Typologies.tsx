'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useCurrencyContext } from '@/contexts/CurrencyContext'
import { currencyFormatter } from '@/lib/currencyFormatter'
import { getAssetUrl } from '@/services/utils'
import { IBLUEPRINT } from '@/types/blueprint'
import { Bath, BedDouble, Grid2X2, LucideIcon, ParkingSquare } from 'lucide-react'
import Image from 'next/image'

export const Typologies = ({typologies}: {typologies: IBLUEPRINT[]}) => {
  const {convert, currency} = useCurrencyContext()
  return (
    <Accordion type="single" collapsible className="w-full mt-6">
      { typologies.map(({_id, name, blueprint, rooms, bathrooms, parking, area, price, privateArea}) => {
        return (
          <AccordionItem value={name} key={_id}>
            <AccordionTrigger className='text-primary-600 flex-col lg:flex-row !no-underline hover:bg-primary-50 px-2 gap-10'>
              <p>{name}</p>
              <div className='flex-1 text-sm grid grid-cols-3 lg:grid-cols-6 gap-2 justify-items-center'>
                <InfoLabelIcon label='Habitaciones' value={rooms} Icon={BedDouble} />
                <InfoLabelIcon label='Baños' value={bathrooms} Icon={Bath} />
                <InfoLabelIcon label='Parqueadero' value={parking} Icon={ParkingSquare} />
                <InfoLabel label='Área' value={<span>{area} m<sup>2</sup></span>} />
                <InfoLabel label='Área privada' value={<span>{privateArea} m<sup>2</sup></span>} />
                <InfoLabel label='Precio' value={ `${currencyFormatter(convert(price), currency)} ${currency}`} />
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <Image
                unoptimized
                width={100}
                height={100}
                className='w-full h-full object-cover'
                src={getAssetUrl(blueprint)}
                alt={name}
              />
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}

const InfoLabelIcon = ({label, value, Icon}: {label: string, value: string | number, Icon: LucideIcon}) => (
  <div>
    <div className='flex gap-2 items-center'>
      <Icon className='w-4 h-4'/>
      <p className='text-black'>{value}</p>
    </div>
    <p className='text-xs text-left text-primary-800 font-light'>{label }</p>
  </div>
)

const InfoLabel = ({label, value}: {label: string, value: string | number | JSX.Element}) => (
  <div className='text-left'>
    <p className='text-xs text-primary-800 font-light'>{label }</p>
    <p className='text-black'>{value}</p>
  </div>
)
