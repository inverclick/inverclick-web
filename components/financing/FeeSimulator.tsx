'use client'
import React from 'react'
import { SelectCurrency } from '../projects/SelectCurrency'
import CurrencyInput from 'react-currency-input-field';
import { useCurrencyContext } from '@/contexts/CurrencyContext';
import { Checkbox } from '../ui/checkbox';

export const FeeSimulator = () => {
  const [inputValue, setInputValue] = React.useState<string>('')
  const { currency } = useCurrencyContext()
  
  const locale = currency === 'COP' ? 'es-CO' : currency === 'EUR' ? 'de-DE' : 'en-US'
  
  return (
    <article className='flex-1 flex flex-col gap-6'>
      <div className='flex gap-4 items-center'>
        <p className='text-lg font-medium'>¿Cuál es el valor comercial de la vivienda?</p>
        <SelectCurrency />
      </div>
      <div className='w-fit'>
        <CurrencyInput
          key={currency}
          placeholder="Please enter a number"
          defaultValue={1000}
          intlConfig={{locale,currency}}
          decimalsLimit={2}
          value={inputValue}
          className='text-3xl h-20 border border-black rounded-xl px-4 focus:outline-none'
          onValueChange={value => setInputValue(String(value))}
        />
      </div>
      <div className='flex items-center gap-8'>
        <div className='flex  items-center gap-2'>
          <p className='font-light'>Crédito hipotecario</p>
          <Checkbox className='data-[state=checked]:bg-primary-600 data-[state=checked]:border-none' />
        </div>
        <div className='flex items-center gap-2'>
          <p className='font-light' >Leasing Habitacional</p>
          <Checkbox className='data-[state=checked]:bg-primary-600 data-[state=checked]:border-none' />
        </div>
          
      </div>
    </article>
  )
}
