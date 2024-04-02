'use client'
import { useCurrencyContext } from '@/contexts/CurrencyContext'
import { currencyFormatter } from '@/lib/currencyFormatter';
import React, { useEffect, useState } from 'react'

interface Props {
  className?: string;
  number: number;
}

export const DisplayFormattedCurrency = ({className, number}: Props) => {
  const { convert, currency } = useCurrencyContext()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  } ,[])

  if(!isMounted) return null

  return (
    <div className={className}>
      { currencyFormatter(convert(number), currency)} {currency}
    </div>
  )
}
