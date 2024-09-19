"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay, { AutoplayType } from "embla-carousel-autoplay";
import { Children, ComponentProps, useEffect, useState } from "react";

export type AdvertisingCarouselProps = Readonly<{}> & ComponentProps<"div">;

export function AdvertisingCarousel({
  children,
  className,
  ...props
}: AdvertisingCarouselProps) {
  const duration = 5000;

  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className={cn(className)} {...props}>
      <Carousel
        setApi={setApi}
        plugins={[Autoplay({ playOnInit: true, delay: duration, jump: false })]}
        className="w-full max-w-xs"
      >
        <CarouselContent>{children}</CarouselContent>
      </Carousel>
      {api && (
        <ul className="flex gap-4 justify-center">
          {Children.map(children, (_, index) => {
            return (
              <SlideButton
                active={index === currentIndex}
                duration={duration}
                onClick={() => {
                  api.scrollTo(index);
                  (api.plugins().autoplay as AutoplayType).reset();
                }}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export type AdvertisingCarouselItemProps = Readonly<{}> &
  ComponentProps<typeof CarouselItem>;

export function AdvertisingCarouselItem({
  children,
  className,
  ...props
}: AdvertisingCarouselItemProps) {
  return (
    <CarouselItem className={cn(className)} {...props}>
      {children}
    </CarouselItem>
  );
}

type SlideButtonProps = Readonly<{
  active: boolean;
  duration: number;
  onClick: () => void;
}>;

function SlideButton({ active, duration, onClick }: SlideButtonProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) {
      setProgress(0);
      return;
    }

    const interval = 50; // Update every 50ms for smoothness
    const steps = duration / interval;
    const incrementPerStep = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return Math.min(prevProgress + incrementPerStep, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, active]);

  return (
    <button
      className="w-8 h-2 mt-4 bg-slate-400 rounded-full overflow-hidden hover:bg-slate-500 transition-colors ease-out"
      onClick={onClick}
    >
      <div
        className="h-full bg-primary transition-all ease-out"
        style={{ width: `${progress}%` }}
      />
    </button>
  );
}
