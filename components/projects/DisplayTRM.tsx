'use client'
import { useCurrencyContext } from "@/contexts/CurrencyContext"
import { currencyFormatter } from "@/lib/currencyFormatter"
import { useEffect } from "react"

export default function DisplayTRM () {
  const { TRM_USD, loadTRM } = useCurrencyContext()

  useEffect(() => {
    loadTRM()
  }, [loadTRM])

  return (
    <div className="text-[10px] xl:text-[12px] mb-[1px] font-medium">
      TRM HOY: {currencyFormatter(TRM_USD, 'COP')} <span className="text-[8px] xl:text-[10px]">COP</span>
    </div>
  )
}
