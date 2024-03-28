
import type { IBLUEPRINT_POPULATED } from '@/types/blueprint';
import { SelectCurrency } from './SelectCurrency';
import { ProjectInfinityScroll } from './ProjectInfinityScroll';
import { ProjectFilters } from './Filters/ProjectFilters';
import { getCities, getDepartments, getGraphicPriceRange } from '@/services/utils';

interface Props {
  total: number;
  blueprints: IBLUEPRINT_POPULATED[];
  department: string | null;
}

export default async function ProjectContent ({ total, blueprints, department }: Props) {
  const [departmentsResponse, priceGraphicDataResponse] = await Promise.all([
    getDepartments(),
    getGraphicPriceRange()
  ])

  const { data: priceGraphicData} = priceGraphicDataResponse

  const { data: departments } = departmentsResponse
  const { data: cities } = await getCities(department)

  return (
    <section className='mt-20 mx-6'>
      <div className='flex justify-between text-sm text-primary-600 mb-3'>
        <div className='flex gap-3 items-center'>
          <ProjectFilters  
            count={total} 
            departments={departments} 
            cities={cities} 
            priceGraphicData={priceGraphicData}
          /> 
          <SelectCurrency />
        </div>
        <p className='flex gap-1 justify-center items-center'>
          <span className='font-medium'>Total:</span>
          {total}
        </p>
      </div>
      <ProjectInfinityScroll blueprints={blueprints} />
    </section>
  )
}



