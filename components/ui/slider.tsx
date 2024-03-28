// slider.tsx
'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { Bar, BarChart, ResponsiveContainer } from "recharts"
import { cn } from '@/lib/utils';

 
const data = [{ goal: 100, },{ goal: 140, },{ goal: 200, },{ goal: 300, },{ goal: 200, },{ goal: 278, },{ goal: 189, },{ goal: 239, },{ goal: 300, },{ goal: 200, },{ goal: 278, },{ goal: 189, },{ goal: 349, }, { goal: 400, },{ goal: 300, },{ goal: 200, },{ goal: 300, },{ goal: 200, },{ goal: 278, },{ goal: 189, },{ goal: 239, },{ goal: 300, },{ goal: 200, },{ goal: 278, },{ goal: 189, },{ goal: 349, }]

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn('relative flex w-full touch-none select-none items-end', className)}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-16 rounded-none w-full grow overflow-hidden bg-white">
      <div className='absolute top-0 bottom-0 w-full bg-white'>
        <ResponsiveContainer width="100%" height="100%" className='border-b-2 p-0 border-primary-200'>
          <BarChart data={data}>
            <Bar
              dataKey="goal"
              className='fill-primary-200 translate-y-1'
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <SliderPrimitive.Range className="absolute h-full bg-primary-900 mix-blend-color-burn" />  
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="translate-y-2 block h-5 w-5 rounded-full border-2 border-primary-600 bg-primary-50 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    <SliderPrimitive.Thumb className="translate-y-2 block h-5 w-5 rounded-full border-2 border-primary-600 bg-primary-50 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };

