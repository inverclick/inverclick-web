'use client'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useMemo, useState } from 'react'

interface Props {
  departments: {departamento: string}[], 
  cities: {municipio: string}[]
}  

export const LocationFilter = ({departments, cities}: Props) => {
  const searchParams = useSearchParams()
  const [currentDepartment, setCurrentDepartment] = useState( searchParams.get('department') || 'all')
  const [currentCity, setCurrentCity] = useState(searchParams.get('city') || 'all')
  const pathname = usePathname()
  const router = useRouter()

  const departmentsOptions = useMemo(() => departments.map(({departamento}) => ({label: departamento, value: departamento})), [departments])
  const citiesOptions = useMemo(() => cities.map(({municipio}) => ({label: municipio, value: municipio})), [cities])

  const onChangeDepartment = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('department', value)
    if(value === 'all'){ 
      newSearchParams.delete('department')
      newSearchParams.delete('city')
      setCurrentDepartment('all')
      setCurrentCity('all')
    } else {
      setCurrentDepartment(value)
    }
    router.push(`${pathname}?${newSearchParams.toString()}`)
  }

  const onChangeCity = (value: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set('city', value)
    if(value === 'all') {
      newSearchParams.delete('city')
      setCurrentCity('all')
    } else {
      setCurrentCity(value)
    }
    router.push(`${pathname}?${newSearchParams.toString()}`)
  }


  return (
    <section className="flex flex-col gap-3">
      <h4 className="font-medium md:text-lg">Ubicación</h4>
      <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
        <CustomSelect 
          label='Departamento' 
          options={departmentsOptions} 
          onChange={onChangeDepartment} 
          value={currentDepartment}
        />
        <CustomSelect
          label='Ciudad'
          options={citiesOptions}
          onChange={onChangeCity}
          value={currentCity}
        />
      </div>
    </section>
  )
}

interface CustomSelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  options: { label: string, value: string }[]
}

const CustomSelect = ({label, options, onChange, value}: CustomSelectProps) => (
  
  <Select value={value} onValueChange={onChange} disabled={!options.length}>
    <SelectTrigger className="relative h-14 pb-0 pt-4 rounded-lg border-zinc-800 text-sm md:text-base">
      <p className='absolute top-1 left-3 text-[10px] md:text-xs font-light'>{label}</p>
      <SelectValue />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>{label}</SelectLabel>
        <SelectItem key='all' value='all'>Todos</SelectItem>
        { options.map( ({label, value}) => 
          <SelectItem key={value} value={value}>{label}</SelectItem>
        )}
      </SelectGroup>
    </SelectContent>
  </Select>
)
