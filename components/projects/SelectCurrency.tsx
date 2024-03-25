'use client'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCurrencyContext } from "@/contexts/CurrencyContext"


export const SelectCurrency = () => {
  const {currency, changeCurrency} = useCurrencyContext()
  return (
    <Select value={currency} onValueChange={changeCurrency}>
      <SelectTrigger className="w-20 py-1 h-8 focus:ring-primary-600 hover:bg-primary-100 transition ease-in">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="COP">COP</SelectItem>
        <SelectItem value="USD">USD</SelectItem>
        <SelectItem value="EUR">EUR</SelectItem>
      </SelectContent>
    </Select>
  )
}
