
import { useProgressiveNumber } from '@/hooks/useProgressiveNumber'
import { useEffect } from 'react'

export const CountUp = (
  { initial, final, decimals, duration, formatter }:
  { initial: number, final: number, decimals?: number, duration?: number, formatter?: (value: string | number) => string }
) => {
  const [count, setCount] = useProgressiveNumber(initial, duration, decimals)

  useEffect(() => {
    setCount(String(final))
  }, [final])

  if(formatter) return <span>{ formatter(count)}</span>
  return <span>{ count}</span>
}