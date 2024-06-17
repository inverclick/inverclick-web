import React from 'react'
import './financing.css'

export const SimulatorResult = () => {
  return (
    <section>
      <svg width="500" height="500" viewBox="0 0 500 500" className="circular-progress">
        <circle className="bg"></circle>
        <circle className="fg"></circle>
      </svg>
    </section>
  )
}
