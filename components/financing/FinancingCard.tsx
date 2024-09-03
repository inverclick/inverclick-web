"use client";

import "@/app/styles/flip-card.css";
import { Plus } from "lucide-react";
import React, { ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  frontContent: ReactNode;
  color: string;
  direction: "horizontal" | "vertical";
  content: ReactNode;
}

export const FinancingCard = ({
  color,
  content,
  frontContent,
  direction,
}: Props) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const [isFlipped, setIsFlipped] = useState(false);
  const [height, setHeight] = useState<number | null>(null);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
      setIsFlipped(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <article
        onClick={handleCardClick}
        onKeyDown={handleCardClick}
        className={`${isFlipped ? "z-30" : ""} flip-card ${
          isFlipped ? "flipped" : ""
        } flex-1 my-atropos m-2 drop-shadow-2xl cursor-pointer`}
        style={height ? { minHeight: height } : undefined}
      >
        <div
          className={"flip-card-inner-" + direction}
          style={height ? { minHeight: height } : undefined}
        >
          <div
            className="flip-card-front bg-white"
            style={height ? { height: "100%" } : undefined}
          >
            {frontContent}
            <div
              className="absolute bottom-8 right-8 rounded-full p-2"
              style={{ background: color }}
            >
              <Plus className="h-8 w-8 text-white" />
            </div>
          </div>
          <div
            ref={(ref) => {
              cardRef.current = ref;
              if (ref) setHeight(ref.clientHeight);
            }}
            className={"flip-card-back-" + direction}
            style={height ? { height: "100%" } : undefined}
          >
            {content}
          </div>
        </div>
      </article>
      {isFlipped ? (
        <div className="fixed bottom-0 top-0 left-0 right-0 bg-black/70 z-10 animate-fade-in" />
      ) : null}
    </>
  );
};
