'use client'
import React, { useState } from 'react'
import { SelectCurrency } from '../projects/SelectCurrency'
import { Input } from '../ui/input'

export const CreditSimulador = () => {
  const [simulatorType, setSimulatorType] = useState<'VALOR' | 'CUOTA'>('VALOR')
  const [inputValue, setInputValue] = useState<string>('')

  return (
    <section className='flex flex-col gap-8'>
      <div className='border border-primary-600 w-fit rounded-full '>
        <button 
          onClick={() => setSimulatorType('VALOR')}
          className={`${simulatorType === 'VALOR' ? 'bg-primary-600 text-white' : ''} px-6 py-2 rounded-full `}
        >Valor de la vivienda</button>
        <button 
          onClick={() => setSimulatorType('CUOTA')}
          className={`${simulatorType === 'CUOTA' ? 'bg-primary-600 text-white' : ''} px-6 py-2 rounded-full `}
        >Cuota que quiero pagar</button>
      </div>
      <div className='flex gap-4 items-center'>
        <p className='text-lg font-medium'>¿Cuál es el valor comercial de la vivienda?</p>
        <SelectCurrency />
      </div>
      <div className='w-fit'>
        <Input value={1213} className='text-4xl h-16'  />
      </div>
    </section>
  )
}
