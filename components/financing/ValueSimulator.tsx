'use client'
import React, { useState } from 'react'
import { SelectCurrency } from '../projects/SelectCurrency'
import CurrencyInput from 'react-currency-input-field';
import { useCurrencyContext } from '@/contexts/CurrencyContext';
import { Checkbox } from '../ui/checkbox';
import { NativeSlider } from '../ui/slider-native';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { currencyFormatter } from '@/lib/currencyFormatter';

interface Props {
  onSimulate: () => void
  onRest: () => void
}


export const ValueSimulator = ({onSimulate, onRest}: Props) => {
  const [inputValue, setInputValue] = useState<string>('1000000')
  const [years, setYears] = useState(15)
  const [percentage, setPercentage] = useState(70)
  const { currency } = useCurrencyContext()
  const [date, setDate] = useState<Date>();
  
  const locale = currency === 'COP' ? 'es-CO' : currency === 'EUR' ? 'de-DE' : 'en-US'
  
  return (
    <article className='flex-1 flex flex-col gap-6 animate-blurred-fade-in'>
      <div className='flex gap-4 items-center'>
        <p className='text-lg font-medium'>¿Cuál es el valor comercial de la vivienda?</p>
        <SelectCurrency />
      </div>
      <div className='w-fit'>
        <CurrencyInput
          key={currency}
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
      <div className='flex gap-10 my-8 justify-center items-center'>
        <div className='flex-1 text-center'>
          <p className='font-medium text-lg mb-4'>¿Cuanto dinero necesitas?</p>
          <p className='font-medium text-3xl mb-4 '>
            {percentage}%
          </p>
          <NativeSlider 
            defaultValue={[percentage]}
            onValueChange={(values) => setPercentage(values[0])}
            max={70} 
            step={1} 
          />
        </div>
        <div className='text-4xl'>
          =
        </div>
        <div className='flex-1 text-3xl text-center'>
          { isNaN(Number(inputValue)) ? '' :   currencyFormatter((Number(inputValue) * percentage / 100), currency)}
        </div>
      </div>
      <div className='flex gap-10'>
        <div className='flex-1 text-center'>
          <p className='font-medium text-lg mb-4'>¿A cuantos años?</p>
          <p className='font-medium text-3xl mb-4 '>
            {years} años
          </p>
          <NativeSlider 
            defaultValue={[years]}
            onValueChange={(values) => setYears(values[0])}
            max={15} 
            step={1} 
          />
        </div>
        <div className='flex-1 text-center'>
          <p className='font-medium text-lg mb-4'>Fecha de nacimiento</p>
          <Popover>
            <PopoverTrigger asChild>
              <p className='cursor-pointer text-2xl'>
                {formatDate(date) || 'DD/MM/AAAA'}
              </p>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                captionLayout="dropdown-buttons"
                selected={date}
                onSelect={setDate}
                fromYear={1960}
                toYear={2030}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className='mt-4 self-center flex gap-3'>
        <button onClick={onSimulate} className="text-sm md:text-base px-6 text-white py-2 rounded-full bg-primary-600 hover:bg-primary-700">Simular</button>
        <button onClick={onRest} className="text-sm md:text-base px-6 py-2 rounded-full bg-slate-300 text-slate-600 hover:bg-slate-200 transition-colors ease-in">Reiniciar</button>
      </div>
    </article>
  )
}

function formatDate(date: Date | undefined) {
  if (!date) return 'DD/MM/YYYY';
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  return `${day < 10 ? '0' + day : day.toString()}/${month < 10 ? '0' + month : month.toString()}/${year}`;
}
