import { useDebounce } from "@/hooks/useDebounce"
import { Building, Home, LandPlot, Warehouse } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const TYPE_FILTER_OPTIONS = [
  { label: 'Casa', value: 'Casa', Icon: Home },
  { label: 'Apartamento', value: 'Apartamento', Icon: Building},
  { label: 'Lote', value: 'Lote',  Icon: LandPlot },
  { label: 'Bodega', value: 'Bodega', Icon: Warehouse },
]

export const TypeFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [currentTypes, setCurrentTypes] = useState<string[]>(searchParams.get('type')?.split('-') || [])
  const debouncedTypes = useDebounce(currentTypes, 300)

  useEffect(() => {
    if(debouncedTypes) {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set('type', debouncedTypes.join('-'))
  
      if(debouncedTypes.length === 0) newSearchParams.delete('type')
      router.push(`${pathname}?${newSearchParams.toString()}`)
    }
    
  }, [debouncedTypes, pathname, router, searchParams])

  const onChange = (type: string) => {    
    const newTypes = (currentTypes.includes(type) ? currentTypes.filter(t => t !== type) : [...currentTypes, type]).filter(t => t.length)
    setCurrentTypes(newTypes)
  }

  return (
    <section className="flex flex-col gap-3">
      <h4 className="font-medium md:text-lg">Tipo de propiedad</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      { TYPE_FILTER_OPTIONS.map(({ label, value, Icon }) => 
        <button 
          key={value}
          onClick={() => onChange(value)}
          className={`flex flex-col gap-1 border border-black rounded-lg p-3 hover:bg-primary-800 hover:text-white hover:border-primary-800 transition-colors ease-in ${currentTypes.includes(value) ? 'bg-primary-600 text-white border-primary-600' : ''}`}
        >
          <Icon className="h-5 w-5 md:h-7 md:w-7 " />
          <span className="text-sm md:text-base font-medium">{label}</span>
        </button>
      )}
      </div>
    </section>
  )
}