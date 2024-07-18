"use client";

import { Typewriter } from "@/components/web/Typewriter";

const texts = [
  {
    title: "Invierte en Propiedad Raíz desde EL EXTERIOR",
    subtitle: "Maximiza tu capital vía valorización",
  },
  {
    title: "Innovate and Inspire",
    subtitle: "Asegura tu futuro invirtiendo en propiedad raíz",
  },
  {
    title: "Journey Through Time",
    subtitle: "Invierte inteligentemente: tu patrimonio creciendo en Colombia",
  },
  {
    title: "Innovate and Inspire",
    subtitle: "Maximiza tu capital vía valorización",
  },
];

export const DynamicPhrases = () => {
  return (
    <div className="text-center md:text-left text-base md:text-lg">
      <Typewriter texts={texts} />
    </div>
  );
};
