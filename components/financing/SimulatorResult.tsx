'use client'
import React from 'react'
import './financing.css'
import { useCurrencyContext } from '@/contexts/CurrencyContext'
import { currencyFormatter } from '@/lib/currencyFormatter'
import { CountUp } from '../shared/CountUp'

interface Props {
  value: number
}
//3124434000
export const SimulatorResult = ({ value }: Props) => {
  const { currency, convert } = useCurrencyContext()
  
return (
    <section className='circular-progress-container'>
      <svg width="400" height="400" viewBox="0 0 400 400" className={`circular-progress ${value !== 0 ? 'circular-progress-animation' : ''}`}>
        <circle className="bg"></circle>
        <circle className="fg"></circle>
      </svg>
      <div className='flex flex-col absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 min-w-64'>
        <p className='text-3xl font-medium mb-2 text-center'>
          <CountUp 
            initial={0} 
            final={value} 
            decimals={2} 
            formatter={(newValue) => currencyFormatter(convert(Number(newValue)), currency)}
          />&nbsp;*
        </p>
        <div className='flex gap-8 justify-between mx-10'>
          <p className='text-sm'>Tasa e.a.</p>
          <p className='text-sm'>13,98%*</p>
        </div>
        <div className='flex gap-8 justify-between mx-10'>
          <p className='text-sm'>Tasa n.m.v</p>
          <p className='text-sm'>1,09%*</p>
        </div>
      </div>
      <svg viewBox="0 0 400 400" width="400" height="400" className='absolute top-[53%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rotate-180'>
        <path id="curve" d="M 200 40 A 160 160 0 1 1 200 360 A 160 160 0 1 1 200 40" className="fill-transparent" />
        <text>
          <textPath href="#curve" startOffset="50%" textAnchor="middle" lengthAdjust="spacingAndGlyphs" className='fill-gray-400'>
            Cuota mensual fija a pagar *
          </textPath>
        </text>
      </svg>
    </section>
  )
}
