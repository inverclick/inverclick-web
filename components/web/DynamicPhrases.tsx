"use client";

import { Typewriter } from "@/components/web/Typewriter";

const texts = [
  {
    title: "Invierte en Propiedad Raíz desde EL EXTERIOR",
    subtitle: "Tu patrimonio creciendo en Colombia",
  },
  {
    title: "Te ayudamos a financiar tu inversión",
    subtitle: "Tenemos los mejores convenios con los bancos más importantes del país",
  },
  {
    title: "Invierte inteligentemente",
    subtitle: "Maximiza tu capital vía valorización",
  },
  {
    title: "Asegura tu futuro",
    subtitle: "Invierte en Propiedad Raíz",
  },
];

export const DynamicPhrases = () => {
  return (
    <div className="text-center md:text-left text-base md:text-lg">
      <Typewriter texts={texts} />
    </div>
  );
};
