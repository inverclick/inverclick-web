"use client";

import { ReactNode, useEffect, useRef, useState } from "react";

export type LazyMountProps = {
  children: ReactNode;
  placeholder: ReactNode;
  rootMargin?: string;
};

/**
 * Defers mounting `children` until the wrapper is within `rootMargin` of the
 * viewport, rendering `placeholder` until then. Used to avoid mounting every
 * card (and its images) in a long grid/list up front.
 */
export function LazyMount({
  children,
  placeholder,
  rootMargin = "800px 0px",
}: LazyMountProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [isVisible, rootMargin]);

  return <div ref={ref}>{isVisible ? children : placeholder}</div>;
}
