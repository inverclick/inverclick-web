'use client'
import React, { useEffect, useState } from 'react'
import { SelectSimulatorType } from './SelectSimulatorType'
import { FeeSimulator } from './FeeSimulator'
import { ValueSimulator } from './ValueSimulator'
import { SimulatorResult } from './SimulatorResult'

export const CreditSimulador = () => {
  const [simulatorType, setSimulatorType] = useState<'VALOR' | 'CUOTA'>('VALOR')
  const [valueCredit, setValueCredit] = useState(0)
  const [quotaCredit, setQuotaCredit] = useState(0)

  return (
    <section className='flex flex-col gap-6'>
      <SelectSimulatorType setSimulatorType={setSimulatorType} simulatorType={simulatorType} />
      <div className='flex flex-col md:flex-row'>
        { 
          simulatorType === 'VALOR' ? 
            <ValueSimulator 
              onSimulate={() => {
                setValueCredit(3124434000)
                setSimulatorType('VALOR')
              }} 
            /> 
          : null
        }
        { 
          simulatorType === 'CUOTA' ? 
            <FeeSimulator 
              onSimulate={() => {
                setQuotaCredit(3124434000)
                setSimulatorType('CUOTA')
              }} 
            /> 
          : null
        }
        <article key={simulatorType} className='flex-1 flex justify-center items-center animate-blurred-fade-in'>
          <SimulatorResult 
            value={simulatorType === 'VALOR' ? valueCredit : quotaCredit} 
          />
        </article>
      </div>
    </section>
  )
}