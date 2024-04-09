
import type { IBLUEPRINT_POPULATED } from '@/types/blueprint';
import { SelectCurrency } from './SelectCurrency';
import { ProjectInfinityScroll } from './ProjectInfinityScroll';
import { ProjectFilters } from './Filters/ProjectFilters';
import { getCities, getDepartments, getGraphicPriceRange, getHousingTypes } from '@/services/utils';
import { Suspense } from 'react';

interface Props {
  total: number;
  blueprints: IBLUEPRINT_POPULATED[];
  department: string | null;
}

export default async function ProjectContent ({ total, blueprints, department }: Props) {
  const [departmentsResponse, priceGraphicDataResponse, housingTypesResponse] = await Promise.all([
    getDepartments(),
    getGraphicPriceRange(),
    getHousingTypes()
  ])

  const { data: priceGraphicData} = priceGraphicDataResponse
  const { data: housingTypes } = housingTypesResponse

  const { data: departments } = departmentsResponse
  const { data: cities } = await getCities(department)

  return (
    <section className='lg:mt-20 mx-4'>
      <div className='flex justify-between text-sm text-primary-600 mb-3'>
        <div className='hidden lg:flex gap-3 items-center'>
          <Suspense>
            <ProjectFilters  
              count={total} 
              departments={departments} 
              cities={cities} 
              priceGraphicData={priceGraphicData}
              housingTypes={housingTypes}
            /> 
          </Suspense>
          <SelectCurrency />
        </div>
        <p className='hidden lg:flex gap-1 justify-center items-center'>
          <span className='font-medium'>Total:</span>
          {total}
        </p>
      </div>
      <ProjectInfinityScroll blueprints={blueprints} />
    </section>
  )
}



