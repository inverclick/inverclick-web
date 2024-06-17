import React from 'react'

interface Props {
  setSimulatorType: (type: 'VALOR' | 'CUOTA') => void
  simulatorType: 'VALOR' | 'CUOTA'
}

export const SelectSimulatorType = ({setSimulatorType, simulatorType}: Props) => {
  return (
    <div className='border border-primary-600 w-fit rounded-full mb-12'>
        <button 
          onClick={() => setSimulatorType('VALOR')}
          className={`${simulatorType === 'VALOR' ? 'bg-primary-600 text-white' : ''} px-6 py-2 rounded-full `}
        >Valor de la vivienda</button>
        <button 
          onClick={() => setSimulatorType('CUOTA')}
          className={`${simulatorType === 'CUOTA' ? 'bg-primary-600 text-white' : ''} px-6 py-2 rounded-full `}
        >Cuota que quiero pagar</button>
      </div>
  )
}
