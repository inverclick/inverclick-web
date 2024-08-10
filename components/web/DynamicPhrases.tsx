"use client";

import { Typewriter } from "@/components/web/Typewriter";

const texts = [
  {
    title: "Invierte en Propiedad Raíz desde EL EXTERIOR",
    subtitle: "Tu patrimonio creciendo en Colombia.",
  },
  {
    title: "Te ayudamos a financiar tu inversión",
    subtitle: "Tenemos los mejores convenios con los bancos más importantes.",
  },
  {
    title: "Invierte inteligentemente",
    subtitle: "Maximiza tu capital vía valorización.",
  },
  {
    title: "Asegura tu futuro",
    subtitle: "Invierte en Propiedad Raíz en Colombia.",
  },
];

export const DynamicPhrases = () => {
  return (
    <div className="mb-4 lg:mb-0">
      <Typewriter texts={texts} />
    </div>
  );
};
