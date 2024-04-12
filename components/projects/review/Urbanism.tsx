import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Image from 'next/image'
import React from 'react'

export const Urbanism = ({urbanismPhotos}: {urbanismPhotos: string[]}) => {
  return (
    <Carousel
      opts={{
        align: "center",
      }}
      className="w-full my-6 lg:px-20 "
    >
      <CarouselContent>
        { urbanismPhotos.map( (p, index) =>
          <CarouselItem key={index}>
            <Image
              unoptimized
              src={p}
              alt={'Urbanismo #' + index}
              width={600}
              height={400}
              className='w-full h-auto object-cover'
            />
          </CarouselItem>
        )}
      </CarouselContent>
      <CarouselPrevious className='!left-2 md:!left-6' />
      <CarouselNext className='!right-2 md:!right-6' />
    </Carousel>
  )
}
