'use client'
import React, { useState } from 'react'
import { SelectSimulatorType } from './SelectSimulatorType'
import { FeeSimulator } from './FeeSimulator'
import { ValueSimulator } from './ValueSimulator'
import { SimulatorResult } from './SimulatorResult'

export const CreditSimulador = () => {
  const [simulatorType, setSimulatorType] = useState<'VALOR' | 'CUOTA'>('VALOR')
  const [inputValue, setInputValue] = useState<string>('')

  return (
    <section className='flex flex-col gap-6'>
      <SelectSimulatorType setSimulatorType={setSimulatorType} simulatorType={simulatorType} />
      <div className='flex'>
        { simulatorType === 'VALOR' ? <ValueSimulator /> : null}
        { simulatorType === 'CUOTA' ? <FeeSimulator /> : null}
        <article className='flex-1'>
          <SimulatorResult />
        </article>
      </div>
    </section>
  )
}