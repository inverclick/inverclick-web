'use client'
import { Plus } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import '@/app/styles/flip-card.css'

interface Props {
  title: string[]
  color: string
  text: string
}

export const FinancingCard = ({color, text, title}: Props) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setIsFlipped(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div onClick={handleCardClick} className={`${isFlipped ? 'z-30' : ''} flip-card ${isFlipped ? 'flipped' : ''} flex-1 my-atropos p-2 drop-shadow-2xl cursor-pointer`}>
        <div className="flip-card-inner">
          <div className="flip-card-front bg-white">
            <p className='ml-8 lg:mx-10 xl:m-20 text-4xl lg:text-5xl xl:text-6xl text-left font-semibold' style={{color}}>
              {title[0]}
              <br />
              {title[1]}
            </p>
            <div className='absolute bottom-8 right-8 rounded-full p-2' style={{ background: color}}>
              <Plus className="h-8 w-8 text-white" />
            </div>
          </div>
          <div ref={cardRef} className="flip-card-back">
            <p className='text-6xl font-semibold' style={{color}}>
              {text}
            </p>
          </div>
        </div>      
      </div>
      {isFlipped ? <>
        <div onClick={console.log} className='fixed bottom-0 top-0 left-0 right-0 bg-black/70 z-10 animate-fade-in' /> 
      </>: null}
    </>
  )
}
