import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { useDebounce } from "@/hooks/useDebounce"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export const PriceFilter = ({ priceGraphicData }: { priceGraphicData: {goal: number}[]}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [minPrice, setMinPrice] = useState<number | undefined>(Number(searchParams.get('min_price') ?? 0))
  const [maxPrice, setMaxPrice] = useState<number | undefined>(Number(searchParams.get('max_price') ?? 999999999))
  const debouncedMinPrice = useDebounce(minPrice, 500)
  const debouncedMaxPrice = useDebounce(maxPrice, 500)

   useEffect(() => {
    if((!!debouncedMinPrice || debouncedMinPrice === 0) && !!debouncedMaxPrice) {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      newSearchParams.set('min_price', debouncedMinPrice.toString())
      newSearchParams.set('max_price', debouncedMaxPrice.toString())
  
      router.push(`${pathname}?${newSearchParams.toString()}`)
    }

  }, [debouncedMinPrice, debouncedMaxPrice, pathname, router, searchParams])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const newValue = value.length ? Number(value) : undefined
    if(name === 'min_price') {
      setMinPrice(newValue)
    } else {
      setMaxPrice(newValue)
    }
  }

  return (
    <section className="flex flex-col gap-3">
      <h4 className="font-medium md:text-lg">Rango de precios</h4>
      <div className="flex flex-col gap-6 justify-center items-center">
        <div className="self-center w-3/4">
          <Slider
            data={priceGraphicData}
            defaultValue={[0, 999000000]}
            min={0}
            max={999999999}
            step={1}
            onValueChange={(values) => {
              setMinPrice(values[0])
              setMaxPrice(values[1])
            }}
          />
        </div>
        <div className="flex gap-2 justify-center items-center w-3/4">
          <CustomInput label="Mínimo" value={minPrice} name="min_price" onChange={onChange} />
          <span>-</span>
          <CustomInput label="Máximo" value={maxPrice} name="max_price" onChange={onChange} />
        </div>
      </div>
    </section>
  )
}

const CustomInput = ({ value, onChange, name, label }: { label: string, value: number | undefined, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, name: string }) => (
  <div className="flex-1 relative h-14 rounded-lg text-base border border-zinc-800">
    <p className="absolute text-[10px] md:text-xs top-1 left-3">{label}</p>
    <Input value={value} className="mt-3 text-sm md:text-base border-0 focus-visible:ring-0 focus-visible:ring-offset-0" type="number" name={name} onChange={onChange} />
  </div>
)