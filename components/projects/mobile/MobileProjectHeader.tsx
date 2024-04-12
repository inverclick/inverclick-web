import React, { Suspense } from 'react'
import { ProjectFilters } from '../Filters/ProjectFilters'
import { SelectCurrency } from '../SelectCurrency'
import { getDepartments, getGraphicPriceRange, getHousingTypes } from '@/services/utils'

interface Props {
  total: number;
}


export async function MobileProjectHeader ({ total}: Props) {
  const [departmentsResponse, priceGraphicDataResponse, housingTypeResponse] = await Promise.all([
    getDepartments(),
    getGraphicPriceRange(),
    getHousingTypes()
  ])

  const { data: priceGraphicData} = priceGraphicDataResponse
  const {data: housingTypes} = housingTypeResponse

  const { data: departments } = departmentsResponse

  return (
    <div className='absolute z-10 top-0 left-0 right-0 flex items-center justify-between bg-white/40 px-6 py-2 m-3 rounded-3xl backdrop-blur-xl text-primary-600'>
      <div className='flex items-center gap-3'>
        <Suspense>
          <ProjectFilters  
            housingTypes={housingTypes}
            departments={departments} 
            priceGraphicData={priceGraphicData}
            count={total}
          /> 
        </Suspense>
        <SelectCurrency />
      </div>

      <p className='flex gap-1 justify-center items-center text-sm lg:text-base '>
        <span className='font-medium'>Total:</span>
        {total}
      </p>
    </div>
  )
}
