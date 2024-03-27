import { useDebounce } from "@/hooks/useDebounce"
import { HOUSING_STATE_ENUM } from "@/types/project"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const STATE_FILTER_OPTIONS = [
  { label: 'Todos', value: 'all' },
  { label: 'Sobre planos', value: HOUSING_STATE_ENUM.OFF_PLAN},
  { label: 'Nuevos', value: HOUSING_STATE_ENUM.NEW},
  { label: 'Usados', value: HOUSING_STATE_ENUM.USED },
]

export const StateFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [currentState, setCurrentState] = useState<string>(searchParams.get('housing_state') ?? 'all')
  const debouncedState = useDebounce(currentState, 300)

  useEffect(() => {
    if(debouncedState) {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set('housing_state', debouncedState)
  
      if(debouncedState === 'all') newSearchParams.delete('housing_state')
      router.push(`${pathname}?${newSearchParams.toString()}`)
    }
    
  }, [debouncedState, pathname, router, searchParams])

  const onChange = (type: string) => {    
    if(type === 'all') return setCurrentState('all')
    setCurrentState(type)
  }

  return (
    <section className="flex flex-col gap-3">
      <h4 className="font-medium text-lg">Tipo de proyecto</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      { STATE_FILTER_OPTIONS.map(({ label, value }) => 
        <button 
          key={value}
          onClick={() => onChange(value)}
          className={`border border-black rounded-lg p-3 hover:bg-primary-800 hover:text-white hover:border-primary-800 transition-colors ease-in ${currentState.includes(value) ? 'bg-primary-600 text-white border-primary-600' : ''}`}
        >
          <span className="font-medium">{label}</span>
        </button>
      )}
      </div>
    </section>
  )
}