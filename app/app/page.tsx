import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";
import { ENV_VARS } from "@/global/env";
import { Metadata } from "next";

import Image from "next/image";
import Link from "next/link";

import "@/app/styles/app-page.css";

export const metadata: Metadata = {
  title: "App móvil",
  description: "Conoce la app móvil de Inverclick",
  openGraph: {
    url: ENV_VARS.BASE_URL + "/app",
    title: "App Inverclick",
    description: "Conoce la app móvil de Inverclick.",
  },
};

export default function App() {
  return (
    <main>
      <Header />
      <article className="p-content mb-20 flex flex-col">
        <section className="flex h-[77vh] translate-y-5 flex-col items-center justify-center gap-16 md:gap-24">
          <div className="flex flex-col items-center gap-6">
            <div className="w-fit rounded-3xl px-8 py-6 shadow-lg shadow-gray-400">
              <Image
                src="/favicon.svg"
                alt="Inverclick icon"
                height={64}
                width={64}
                className="w-12 -translate-x-1 md:w-16"
              />
            </div>
            <h1 className="text-xl font-semibold text-gray-500">inverclick</h1>
          </div>
          <div className="flex flex-col gap-1 text-center text-3xl font-semibold sm:text-4xl md:gap-4 md:text-5xl">
            <h2>Invierte en propiedad raíz</h2>
            <h2>
              desde <span className="text-primary-600">EL EXTERIOR</span>
            </h2>
          </div>
        </section>
        <ul id="cards" className="max-w-[1200px] self-center">
          <li className="card" id="card_1">
            <div className="card__content">
              <div className="mb-14 grid grid-cols-2 justify-items-center rounded-lg bg-slate-200/80 shadow-2xl backdrop-blur-lg">
                <div className="flex w-full items-center justify-center">
                  <Image
                    unoptimized
                    src="/app/app-3.png"
                    width={230}
                    height={200}
                    alt="App móvil"
                    className="w-36 sm:w-40 sm:translate-y-14 md:w-44 lg:w-64"
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-4 p-10 font-semibold md:gap-6 lg:gap-10">
                  <h3 className="text-center md:text-xl lg:text-2xl">
                    Descubre propiedades verificadas y seguras en Colombia.
                    Inverclick te ofrece un acceso exclusivo a las mejores
                    opciones.
                  </h3>
                  <h2 className="text-center text-lg text-primary-600 md:text-2xl lg:text-3xl">
                    ¡Descarga nuestra app y comienza tu búsqueda!
                  </h2>
                </div>
              </div>
            </div>
          </li>
          <li className="card" id="card_2">
            <div className="card__content bg-white/80 shadow-2xl backdrop-blur-lg">
              <div className="grid grid-cols-2 justify-items-center rounded-lg p-1">
                <div className="flex flex-col items-center justify-center gap-4 py-10 font-semibold md:gap-6 lg:gap-10">
                  <h3 className="text-center md:text-xl lg:text-2xl">
                    Personaliza tu búsqueda usando filtros dinámicos. Nuestra
                    tecnología facilita que tomes la mejor decisión.
                  </h3>
                  <h2 className="text-center text-lg text-primary-600 md:text-2xl lg:text-3xl">
                    ¡Tu mejor inversión a un click de distancia!
                  </h2>
                </div>
                <div className="flex w-full items-center justify-center sm:p-20">
                  <Image
                    unoptimized
                    src="/app/app-4.png"
                    width={230}
                    height={612}
                    alt="App móvil"
                    className="h-[250px] w-[180px] sm:h-[440px] sm:w-auto sm:rotate-[30deg] md:h-[460px] lg:h-[480px] xl:h-[512px]"
                  />
                </div>
              </div>
            </div>
          </li>
          <li className="card" id="card_3">
            <div className="card__content bg-white/70 shadow-2xl backdrop-blur-lg">
              <div className="grid grid-cols-2 justify-items-center rounded-lg">
                <div className="flex flex-col items-center justify-center gap-4 py-10 font-semibold md:gap-6 lg:gap-10">
                  <h3 className="text-center text-lg md:text-xl lg:text-2xl">
                    Accede a un mapa dinámico de opciones inmobiliarias en toda
                    Colombia, explora las mejores alternativas de inversión
                  </h3>
                  <h2 className="text-center text-xl text-primary-600 md:text-2xl lg:text-3xl">
                    ¡Las mejores propiedades están al alcance de tu mano!
                  </h2>
                </div>
                <div className="flex w-full justify-center py-10">
                  <Image
                    unoptimized
                    src="/app/app-2.png"
                    width={230}
                    height={612}
                    alt="App móvil"
                    className="h-[420px] w-auto sm:h-[440px] md:h-[460px] lg:h-[470px]"
                  />
                </div>
              </div>
            </div>
          </li>
          <li className="card" id="card_4">
            <div className="card__content">
              <div className="mb-14 grid grid-cols-2 justify-items-center rounded-lg bg-slate-200/80 backdrop-blur-lg">
                <Image
                  unoptimized
                  src="/app/app-1.png"
                  width={230}
                  height={200}
                  alt="App móvil"
                  className="w-36 translate-y-14 sm:w-40 md:w-44 lg:w-48 xl:w-60"
                />
                <div className="flex flex-col items-center justify-evenly">
                  <h2 className="text-center text-xl font-semibold md:text-2xl lg:text-3xl">
                    Descarga nuestra
                    <br />
                    aplicación móvil
                  </h2>
                  <Image
                    unoptimized
                    src="/app/qr-app.png"
                    width={230}
                    height={230}
                    alt="App QR"
                    className="w-40 rounded-lg shadow-lg sm:w-44 md:w-48 lg:w-52 xl:w-56"
                  />
                  <div className="flex gap-4">
                    <Link href="https://play.google.com/store" target="_blank">
                      <Image
                        unoptimized
                        src="/app/google-play.png"
                        width={150}
                        height={50}
                        alt="Google Play"
                        className="w-24 md:w-28 lg:w-32 xl:w-36"
                      />
                    </Link>
                    <Link
                      href="https://www.apple.com/co/app-store/"
                      target="_blank"
                    >
                      <Image
                        unoptimized
                        src="/app/app-store.png"
                        width={150}
                        height={50}
                        alt="App Store"
                        className="w-24 md:w-28 lg:w-32 xl:w-36"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </article>
      <Footer />
    </main>
  );
}
