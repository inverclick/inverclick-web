'use client'

import { useEffect, useState } from "react"

export const DynamicPhrases = () => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % PHRASES.length)
    }, 3800)

    return () => {
      clearInterval(interval)
    }
  }, [])

  if (!PHRASES[index]) return null
  if (PHRASES[index]) {
    return (
      <div className='text-white animate-fade-in-up' key={index}>
        <h1 className='text-base md:text-xl text-center md:text-left font-light text-black animate-delay-[3400ms] animate-fade-out-up '>{PHRASES[index].title}</h1>
      </div>
    )
  }
}

const PHRASES = [
  { title: 'Asegura tu futuro invirtiendo en propiedad raíz' },
  { title: 'Invierte inteligentemente: tu patrimonio creciendo en Colombia' },
  { title: 'Maximiza tu capital vía valorización' }
]