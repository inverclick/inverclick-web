import React from 'react'
import { StickyContact } from './StickyContact'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProjectLocation } from './ProjectLocation'
import OtherProjects from './OtherProjects'

interface DescriptionProps {
  name: string
  description: string
  companyName: string
  companyLogo: string
  housingState: string
  department: string
  city: string
  address: string
  location: {
    lat: number
    lng: number
  }
}

export const ProjectContent = ({name, description, location, address, city, department}: DescriptionProps) => {
  return (
    <article className='flex gap-4'>
      <Tabs defaultValue="description" className="flex-1">
        <TabsList className='flex items-center '>
          <TabsTrigger value="description">Descripción</TabsTrigger>
          <TabsTrigger value="types">Tipologías</TabsTrigger>
          <TabsTrigger value="urban">Urbanismo</TabsTrigger>
          <button className='mx-6 px-2 py-1 border border-primary-600 rounded-lg text-base md:text-lg lg:text-xl hover:bg-primary-100 transition-colors ease-in'>Simulador de crédito</button>
        </TabsList>
        <div className='flex gap-6 '>
          <div className='flex-1 flex flex-col gap-6 mb-6'>
            <TabsContent value="description" >
              <div className='flex flex-col gap-3 pb-6 border-b border-black'>
                <p className='font-medium text-2xl mt-6'>{name}</p>
                {description.split('\n').map((p, i) => <p key={i} className='md:max-w-4xl text-sm text-pretty font-light'>{p}</p>)}
              </div>
            </TabsContent>
            <TabsContent value="types">Tipologías</TabsContent>
            <TabsContent value="urban">Urbanismo</TabsContent>
            <ProjectLocation 
              lat={location.lat} 
              lng={location.lng} 
              address={address} 
              city={city} 
              department={department}
            />
          </div>
          <StickyContact />
        </div>
      </Tabs>
    </article>
  )
}
