
import type { IBLUEPRINT_POPULATED } from '@/types/blueprint';
import { SelectCurrency } from './SelectCurrency';
import { ProjectInfinityScroll } from './ProjectInfinityScroll';
import { ProjectFilters } from './Filters/ProjectFilters';

interface Props {
  total: number;
  blueprints: IBLUEPRINT_POPULATED[];
}

export default function ProjectContent ({ total, blueprints }: Props) {
  return (
    <section className='mt-20 mx-6'>
      <div className='flex justify-between text-sm text-primary-600 mb-3'>
        <div className='flex gap-3 items-center'>
          <ProjectFilters count={total} /> 
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



