'use client'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { TypeFilter } from "@/components/projects/Filters/TypeFilter"
import { SlidersHorizontal, X } from "lucide-react"
import {  useEffect, useMemo, useRef, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { LocationFilter } from "./LocationFilter"
import { StateFilter } from "./StateFilter"
import { PriceFilter } from "./PriceFilter"
import { useDebounce } from "@/hooks/useDebounce"
import { Department } from "@/types/department"
import { HousingTypeRow } from "@/types/housing-type"
import { supabase } from "@/services/supabase"

interface Props {
  departments: Department[]
  priceGraphicData: {goal: number}[]
  housingTypes: HousingTypeRow[]
  count: number
}

export const ProjectFilters = ({departments, priceGraphicData, housingTypes, count}: Props) => {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()
  const [currentDepartment, setCurrentDepartment] = useState( searchParams.get('department') || 'all')
  const [currentCity, setCurrentCity] = useState(searchParams.get('city') || 'all')
  const [currentState, setCurrentState] = useState<string>(searchParams.get('housing_state') ?? 'all')
  const [currentTypes, setCurrentTypes] = useState<string[]>(searchParams.get('type')?.split('-') || [])
  const [minPrice, setMinPrice] = useState<number | undefined>(Number(searchParams.get('min_price') ?? 0))
  const [maxPrice, setMaxPrice] = useState<number | undefined>(Number(searchParams.get('max_price') ?? 999999999))
  const debouncedMinPrice = useDebounce(minPrice, 500)
  const debouncedMaxPrice = useDebounce(maxPrice, 500)
  const [currentCount, setCount] = useState(count)
  const pathname = usePathname()
  const router = useRouter()
  const isCounting = useRef(false)

  const hasSearchParams = useMemo(() => searchParams.has('type') || searchParams.has('department') || searchParams.has('housing_state'), [searchParams])

  const onClearSearchParams = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.delete('type')
    setCurrentTypes([])

    newSearchParams.delete('department')
    setCurrentDepartment('all')

    newSearchParams.delete('city')
    setCurrentCity('all')

    newSearchParams.delete('housing_state')
    setCurrentState('all')

    newSearchParams.set('min_price', '0')
    newSearchParams.set('max_price', '999999999')
    setMinPrice(0)
    setMaxPrice(999999999)

    router.replace(`${pathname}?${newSearchParams.toString()}`)
  }

  const onApplyFilters = () => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    
    if(currentDepartment !== 'all') newSearchParams.set('department', currentDepartment)
    else newSearchParams.delete('department')

    if(currentCity !== 'all') newSearchParams.set('city', currentCity)
    else newSearchParams.delete('city')
    
  
    if(currentTypes.length) newSearchParams.set('type', currentTypes.join('-'))
    else newSearchParams.delete('type')

    if(currentState !== 'all') newSearchParams.set('housing_state', currentState)
    else newSearchParams.delete('housing_state')

    newSearchParams.set('min_price', String(minPrice))
    newSearchParams.set('max_price', String(maxPrice))
    
    router.replace(`${pathname}?${newSearchParams.toString()}`)
    setOpen(false)
  }

  useEffect(() => {
    const fetchCount = async () => {
      isCounting.current = true
      let query = supabase.from('projects')
        .select('id, department_id, city_id, typologies!inner(price)', { count: 'exact' })
        .eq('status', 'PUBLISHED')

      if (currentDepartment !== 'all') query.eq('department_id', Number(currentDepartment))
      if (currentCity !== 'all') query.eq('city_id', Number(currentCity))
      if (currentState !== 'all') query.eq('housing_state', currentState)
      if (debouncedMinPrice) query.gte('typologies.price', debouncedMinPrice)
      if (debouncedMaxPrice) query.lte('typologies.price', debouncedMaxPrice)
      if (currentTypes.length > 0) query.in('housing_type', currentTypes)
        
      const { count } = await query
      setCount(count ?? 0)
      isCounting.current = false
    }

    !isCounting.current &&  fetchCount()
  }, [currentDepartment, currentCity, currentTypes, currentState, debouncedMinPrice, debouncedMaxPrice])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="!text-sm font-normal py-1 h-8 hover:bg-primary-100 hover:text-primary-600 ease-in flex gap-3 relative">
          {hasSearchParams ? <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary-700" /> : null}
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 md:min-w-[800px] rounded-lg">
        <header className="flex w-full items-center border-b border-zinc-300 py-3 px-6">
          <X onClick={() => setOpen(false)} className="w-5 h-5 cursor-pointer text-primary-600" />
          <h3 className="flex-1 md:text-lg text-primary-600 text-center font-semibold">Filtros</h3>
        </header>
        <main className="px-12 py-2 flex flex-col gap-6 overflow-x-auto">
          <LocationFilter   
            departments={departments} 
            currentDepartment={currentDepartment}
            setCurrentDepartment={setCurrentDepartment}
            setCurrentCity={setCurrentCity}
            currentCity={currentCity}
          />
          <StateFilter currentState={currentState} setCurrentState={setCurrentState} />
          <TypeFilter housingTypes={housingTypes} currentTypes={currentTypes} setCurrentTypes={setCurrentTypes} />
          <PriceFilter
            priceGraphicData={priceGraphicData} 
            minPrice={Number(minPrice)} 
            maxPrice={Number(maxPrice)}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </main>
        <AlertDialogFooter className="py-4 px-6 gap-4 !justify-between border-t border-zinc-300">
          <button onClick={onClearSearchParams} className="text-sm md:text-base font-medium hover:text-primary-600 transition-colors ease-in">Quitar filtros</button>
          <button onClick={onApplyFilters} className="bg-primary-600 hover:bg-primary-800 transition-colors ease-in text-white px-4 py-2 rounded-md text-sm md:text-base font-medium">Mostrar {currentCount} resultados</button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
