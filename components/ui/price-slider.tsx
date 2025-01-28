import { cn } from "@/lib/utils";
import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

export type SliderProps = {
  data: { goal: number }[];
} & React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>;

const PriceSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, data, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-end",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-16 w-full grow overflow-hidden rounded-none bg-white">
      <div className="absolute bottom-0 top-0 w-full bg-white">
        <ResponsiveContainer
          width="100%"
          height="100%"
          className="border-b-2 border-primary-200 p-0"
        >
          <BarChart data={data}>
            <Bar dataKey="goal" className="translate-y-1 fill-primary-200" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <SliderPrimitive.Range className="absolute h-full bg-primary-900 mix-blend-color-burn" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 -translate-x-3 translate-y-2 rounded-full border-2 border-primary-600 bg-primary-50 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    <SliderPrimitive.Thumb className="block h-5 w-5 translate-x-3 translate-y-2 rounded-full border-2 border-primary-600 bg-primary-50 ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
));

PriceSlider.displayName = SliderPrimitive.Root.displayName;

export { PriceSlider as Slider };
