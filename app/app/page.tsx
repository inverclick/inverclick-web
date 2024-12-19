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
      <article className="p-content flex flex-col mb-20">
        <section className="flex flex-col gap-16 md:gap-24 justify-center items-center h-[77vh] translate-y-5">
          <div className="flex flex-col gap-6 items-center">
            <div className="rounded-3xl shadow-lg shadow-gray-400 px-8 py-6 w-fit">
              <Image
                src="/favicon.svg"
                alt="Inverclick icon"
                height={64}
                width={64}
                className="-translate-x-1 w-12 md:w-16"
              />
            </div>
            <h1 className="text-gray-500 font-semibold text-xl">inverclick</h1>
          </div>
          <div className="flex flex-col gap-1 md:gap-4 text-3xl sm:text-4xl md:text-5xl text-center font-semibold">
            <h2>Invierte en propiedad raíz</h2>
            <h2>
              desde <span className="text-primary-600">EL EXTERIOR</span>
            </h2>
          </div>
        </section>
        <ul id="cards" className="max-w-[1200px] self-center">
          <li className="card" id="card_1">
            <div className="card__content">
              <div className="bg-slate-200/80 backdrop-blur-lg grid grid-cols-2 justify-items-center shadow-2xl rounded-lg mb-14">
                <div className=" w-full flex justify-center items-center">
                  <Image
                    unoptimized
                    src="/app/app-3.png"
                    width={230}
                    height={200}
                    alt="App móvil"
                    className="sm:translate-y-14 w-36 sm:w-40 md:w-44 lg:w-64"
                  />
                </div>
                <div className="flex flex-col justify-center items-center font-semibold gap-4 md:gap-6 lg:gap-10 p-10">
                  <h3 className="md:text-xl lg:text-2xl text-center">
                    Descubre propiedades verificadas y seguras en Colombia.
                    Inverclick te ofrece un acceso exclusivo a las mejores
                    opciones.
                  </h3>
                  <h2 className="text-lg md:text-2xl lg:text-3xl text-center text-primary-600">
                    ¡Descarga nuestra app y comienza tu búsqueda!
                  </h2>
                </div>
              </div>
            </div>
          </li>
          <li className="card" id="card_2">
            <div className="card__content shadow-2xl bg-white/80 backdrop-blur-lg">
              <div className="grid grid-cols-2 justify-items-center rounded-lg p-1">
                <div className="flex flex-col justify-center items-center font-semibold gap-4 md:gap-6 lg:gap-10 py-10">
                  <h3 className=" md:text-xl lg:text-2xl text-center">
                    Personaliza tu búsqueda usando filtros dinámicos. Nuestra
                    tecnología facilita que tomes la mejor decisión.
                  </h3>
                  <h2 className="text-lg md:text-2xl lg:text-3xl text-center text-primary-600">
                    ¡Tu mejor inversión a un click de distancia!
                  </h2>
                </div>
                <div className=" w-full flex justify-center items-center sm:p-20">
                  <Image
                    unoptimized
                    src="/app/app-4.png"
                    width={230}
                    height={612}
                    alt="App móvil"
                    className="sm:rotate-[30deg] w-[180px] h-[250px] sm:w-auto sm:h-[440px] md:h-[460px] lg:h-[480px] xl:h-[512px]"
                  />
                </div>
              </div>
            </div>
          </li>
          <li className="card" id="card_3">
            <div className="card__content shadow-2xl bg-white/70 backdrop-blur-lg">
              <div className="grid grid-cols-2 justify-items-center rounded-lg">
                <div className="flex flex-col justify-center items-center font-semibold gap-4 md:gap-6 lg:gap-10 py-10">
                  <h3 className="text-lg md:text-xl lg:text-2xl text-center">
                    Accede a un mapa dinámico de opciones inmobiliarias en toda
                    Colombia, explora las mejores alternativas de inversión
                  </h3>
                  <h2 className="text-xl md:text-2xl lg:text-3xl text-center text-primary-600">
                    ¡Las mejores propiedades están al alcance de tu mano!
                  </h2>
                </div>
                <div className=" w-full flex justify-center py-10">
                  <Image
                    unoptimized
                    src="/app/app-2.png"
                    width={230}
                    height={612}
                    alt="App móvil"
                    className="w-auto h-[420px] sm:h-[440px] md:h-[460px] lg:h-[470px]"
                  />
                </div>
              </div>
            </div>
          </li>
          <li className="card" id="card_4">
            <div className="card__content">
              <div className="bg-slate-200/80 backdrop-blur-lg grid grid-cols-2 justify-items-center rounded-lg mb-14">
                <Image
                  unoptimized
                  src="/app/app-1.png"
                  width={230}
                  height={200}
                  alt="App móvil"
                  className="translate-y-14 w-36 sm:w-40 md:w-44 lg:w-48 xl:w-60"
                />
                <div className="flex flex-col justify-evenly items-center">
                  <h2 className="text-center font-semibold text-xl md:text-2xl lg:text-3xl">
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
                    className="rounded-lg shadow-lg w-40 sm:w-44 md:w-48 lg:w-52 xl:w-56"
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
