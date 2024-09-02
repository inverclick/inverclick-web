"use client";

import { getOS, OS } from "@/lib/getMobileOperatingSystem";
import { Check } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

const stores: { [key in OS]: string } = {
  Android: "https://play.google.com/store/games?hl=en&pli=1",
  iOS: "https://www.apple.com/app-store/",
  unknown: "https://www.inverclick.com/",
};

const features: { title: string; description: string }[] = [
  {
    title: "Favoritos.",
    description: "Guarda y personaliza tus búsquedas.",
  },
  {
    title: "Comparar.",
    description: "Realiza comparaciones entre propiedades.",
  },
  {
    title: "Mapa.",
    description: "Navega en el mapa interactivo con mayor precisión.",
  },
];

export function DownloadAppPopUp() {
  const pathname = usePathname();
  const isMobileDevice = useMediaQuery("(max-width: 992px)");
  const [isOpen, setIsOpen] = useState(isMobileDevice);

  const openStore = () => {
    const os = getOS();
    window.open(stores[os], "_blank");
  };

  useEffect(() => {
    isMobileDevice && setIsOpen(true);
  }, [pathname, isMobileDevice]);

  return (
    <>
      {isOpen && (
        <div className="fixed z-50 top-0 left-0 flex justify-center items-center h-dvh w-screen bg-white">
          <div className="flex flex-col items-center gap-4 m-4 p-8 bg-gray-100 rounded-3xl">
            <h2 className="text-2xl font-bold text-center mt-16 mb-8">
              Descarga nuestra aplicación móvil
            </h2>
            <Image
              unoptimized
              src="/favicon.svg"
              className="bg-white pl-6 pr-8 py-6 rounded-2xl shadow-lg mb-8"
              width="80"
              height="80"
              alt="Inverclick app logo"
            />
            <ul className="flex flex-col gap-2 mb-8">
              {features.map((feature) => (
                <li key={feature.title} className="flex gap-1">
                  <Check className="text-primary-600" />
                  <p className="text-sm">
                    <span className="font-bold">{feature.title}</span>{" "}
                    {feature.description}
                  </p>
                </li>
              ))}
            </ul>
            <button
              onClick={openStore}
              className="uppercase bg-primary-600 hover:bg-primary-800 transition-colors ease-in text-white px-4 py-2 rounded-md text-sm md:text-base font-medium"
            >
              Descargar
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-primary-600 mb-4 mt-8 text-xs"
            >
              Seguir usando la versión web
            </button>
          </div>
        </div>
      )}
    </>
  );
}
