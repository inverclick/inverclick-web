import { MyHeader } from "@/components/shared/header/MyHeader";
import '@/app/styles/app-page.css'
import { Metadata } from "next";
import { ENV_VARS } from "@/global/env";
import Image from "next/image";

export const metadata: Metadata = {
  title: 'App móvil',
  description: 'Conoce la app móvil de Inverclick',
  openGraph: {
    url: ENV_VARS.BASE_URL + '/app',
    title: 'App Inverclick',
    description: 'Conoce la app móvil de Inverclick.'
  }
}

export default function App() {
  return (
    <main>
      <MyHeader />
      <article className="px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 pt-20 md:pt-24 xl:pt- 28 flex flex-col mb-60">
        <section className="flex flex-col gap-16 md:gap-24 justify-center items-center h-[84vh] -translate-y-4">
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
            <h2>desde el <span className="text-primary-600">EXTERIOR</span></h2>
          </div>
        </section>
        <ul id="cards">
          <li className="card" id="card_1">
            <div className="card__content">
              <div>
                <h2>Card One</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p><a href="#top" className="btn btn--accent">Read more</a></p>
              </div>
              <figure>
                <img src="/img-1.jpg" alt="Image description"/>
              </figure>
            </div>
          </li>
          <li className="card" id="card_2">
            <div className="card__content">
              <div>
                <h2>Card Two</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p><a href="#top" className="btn btn--accent">Read more</a></p>
              </div>
              <figure>
                <img src="/img-2.jpg" alt="Image description"/>
              </figure>
            </div>
          </li>
          <li className="card" id="card_3">
            <div className="card__content">
              <div>
                <h2>Card Three</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p><a href="#top" className="btn btn--accent">Read more</a></p>
              </div>
              <figure>
                <img src="/img-3.jpg" alt="Image description"/>
              </figure>
            </div>
          </li>
          <li className="card" id="card_4">
            <div className="card__content">
              <div>
                <h2>Card Four</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <p><a href="#top" className="btn btn--accent">Read more</a></p>
              </div>
              <figure>
                <img src="/img-2.jpg" alt="Image description"/>
              </figure>
            </div>
          </li>
        </ul>
      </article>
    </main>
  );
}