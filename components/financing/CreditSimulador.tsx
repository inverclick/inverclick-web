'use client'
import React, { useState } from 'react'
import { SelectSimulatorType } from './SelectSimulatorType'
import { FeeSimulator } from './FeeSimulator'
import { ValueSimulator } from './ValueSimulator'
import { SimulatorResult } from './SimulatorResult'

export const CreditSimulador = () => {
  const [simulatorType, setSimulatorType] = useState<'VALOR' | 'CUOTA'>('VALOR')
  const [inputValue, setInputValue] = useState<string>('')
  const [showResult, setShowResult] = useState(false)

  return (
    <section className='flex flex-col gap-6'>
      <SelectSimulatorType setSimulatorType={setSimulatorType} simulatorType={simulatorType} />
      <div className='flex flex-col md:flex-row'>
        { simulatorType === 'VALOR' ? <ValueSimulator onSimulate={() => setShowResult(prev => !prev)} /> : null}
        { simulatorType === 'CUOTA' ? <FeeSimulator onSimulate={() => setShowResult(prev => !prev)} /> : null}
        <article className='flex-1 flex justify-center items-center'>
          { showResult ? <SimulatorResult /> : null }
        </article>
      </div>
    </section>
  )
}