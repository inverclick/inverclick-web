'use client'
import React from 'react'
import Image from 'next/image';


interface Props {
  photos: string[]
}

export const ProjectGallery = ({photos}: Props) => {

  const mainPhoto = photos[0]
  const restPhotos = [...photos, ...photos, ...photos].slice(1, 5)
  
  return (
    <div className=" flex flex-col md:flex-row gap-3 md:h-[312px] lg:h-[412px] 2xl:h-[612px]">
      <Image unoptimized src={mainPhoto} alt="" width='600' height='400' className='w-full h-auto md:rounded-l-3xl flex-1 md:w-[312px] lg:h-[412px] 2xl:h-[612px] object-cover'/>
      <div className={`pswp-gallery grid grid-cols-${restPhotos.length === 1 ? 1 : 2} gap-3 `} id="gallery--individual">
      { restPhotos.map((photo, index) => 
          <Image 
            key={index}
            unoptimized
            src={photo} 
            alt={photo} 
            width='600' 
            height='200' 
            className={`md:h-[150px] md:w-[200px] lg:h-[200px] lg:w-[300px] 2xl:h-[300px] 2xl:w-[400px] object-cover ${index === 1 ? 'md:rounded-tr-3xl' : ''} ${index === 3 ? 'md:rounded-br-3xl' : ''}`}
          />
      )} 
      </div>
  </div>
  )
}
