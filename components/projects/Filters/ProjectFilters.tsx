'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { TypeFilter } from "@/components/projects/Filters/TypeFilter"
import { SlidersHorizontal, X } from "lucide-react"
import {  useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
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

  const hasSearchParams = useMemo(() => searchParams.has('type') || searchParams.has('department') || searchParams.has('housing_state'), [searchParams])

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="!text-sm font-normal py-1 h-8 hover:bg-primary-100 hover:text-primary-600 ease-in flex gap-3 relative">
          {hasSearchParams ? <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-primary-700" /> : null}
          <SlidersHorizontal className="h-4 w-4" />
          Filtros
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="p-0 md:min-w-[800px]">
        <header className="flex w-full items-center border-b border-zinc-300 py-3 px-6">
          <X onClick={() => setOpen(false)} className="w-5 h-5 cursor-pointer text-primary-600" />
          <h3 className="flex-1 text-lg text-primary-600 text-center font-semibold">Filtros</h3>
        </header>
        <main className="px-12 py-2 flex flex-col gap-6">
          <LocationFilter departments={departments} cities={cities} />
          <StateFilter />
          <TypeFilter />
          <PriceFilter priceGraphicData={priceGraphicData} />
        </main>
        <AlertDialogFooter className="py-4 px-6 !justify-between border-t border-zinc-300">
          <AlertDialogCancel className="hover:bg-primary-50 transition-colors ease-in">Quitar filtros</AlertDialogCancel>
          <AlertDialogAction className="bg-primary-600 hover:bg-primary-800 transition-colors ease-in">Mostrar {count} resultados</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

