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
import {  useMemo, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { LocationFilter } from "./LocationFilter"
import { StateFilter } from "./StateFilter"
import { PriceFilter } from "./PriceFilter"

interface Props {
  count: number
  departments: {departamento: string}[]
  cities: {municipio: string}[]
  priceGraphicData: {goal: number}[]
}

export const ProjectFilters = ({count, departments, cities , priceGraphicData}: Props) => {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()
  const [currentDepartment, setCurrentDepartment] = useState( searchParams.get('department') || 'all')
  const [currentCity, setCurrentCity] = useState(searchParams.get('city') || 'all')
  const [currentState, setCurrentState] = useState<string>(searchParams.get('housing_state') ?? 'all')
  const [currentTypes, setCurrentTypes] = useState<string[]>(searchParams.get('type')?.split('-') || [])
  const [minPrice, setMinPrice] = useState<number | undefined>(Number(searchParams.get('min_price') ?? 0))
  const [maxPrice, setMaxPrice] = useState<number | undefined>(Number(searchParams.get('max_price') ?? 999999999))
  const pathname = usePathname()
  const router = useRouter()

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

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="!text-sm font-normal py-1 h-8 hover:bg-primary-100 hover:text-primary-600 ease-in flex gap-3 relative">
          {hasSearchParams ? <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary-700" /> : null}
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 md:min-w-[800px] max-h-[760px] md:max-h-[800px] overflow-scroll rounded-lg">
        <header className="flex w-full items-center border-b border-zinc-300 py-3 px-6">
          <X onClick={() => setOpen(false)} className="w-5 h-5 cursor-pointer text-primary-600" />
          <h3 className="flex-1 md:text-lg text-primary-600 text-center font-semibold">Filtros</h3>
        </header>
        <main className="px-12 py-2 flex flex-col gap-6 overflow-scroll">
          <LocationFilter   
            departments={departments} 
            cities={cities} 
            currentDepartment={currentDepartment}
            setCurrentDepartment={setCurrentDepartment}
            setCurrentCity={setCurrentCity}
            currentCity={currentCity}
          />
          <StateFilter currentState={currentState} setCurrentState={setCurrentState} />
          <TypeFilter currentTypes={currentTypes} setCurrentTypes={setCurrentTypes} />
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
          <button onClick={() => setOpen(false)} className="bg-primary-600 hover:bg-primary-800 transition-colors ease-in text-white px-4 py-2 rounded-md text-sm md:text-base font-medium">Mostrar {count} resultados</button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

