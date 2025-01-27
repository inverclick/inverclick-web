import { CreditSimulador } from "@/components/financing/credit-simulator";
import { FinancingCard } from "@/components/financing/financing-card";
import { Footer } from "@/components/shared/footer/footer";
import { FrequentlyQuestions } from "@/components/shared/frequently-questions";
import { Header } from "@/components/shared/header/header";
import { ENV_VARS } from "@/global/env";
import { Check } from "lucide-react";
import { Metadata } from "next";

import Image from "next/image";

export const metadata: Metadata = {
  title: "Financiación",
  description: "Conoce todos los medios de financiación de Inverclick",
  openGraph: {
    url: ENV_VARS.BASE_URL + "/financing",
    title: "Financiación en Inverclick",
    description:
      "Inverclick ofrece varios métodos de financiación, con alianzas estratégicas con varios bancos nacionales, para brindar las mejores oportunidades a los inversionistas del exterior.",
  },
};

export default function FinancingPage() {
  return (
    <main>
      <div className="flex h-dvh flex-col">
        <Header />
        <article className="p-content-full mx-auto flex max-w-screen-2xl flex-grow flex-col justify-between">
          <section className="flex flex-grow translate-y-5 flex-col items-center justify-center gap-16 md:gap-24">
            <div className="flex animate-blurred-fade-in flex-col gap-3">
              <h1 className="text-5xl font-semibold sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl">
                Crédito de vivienda
              </h1>
              <h2 className="text-2xl font-semibold lg:text-3xl xl:text-4xl">
                Colombianos en{" "}
                <span className="text-primary-600">EL EXTERIOR</span>
              </h2>
            </div>
          </section>
          <div className="my-10 self-center">
            <button className="animate-fade-in-up rounded-full bg-primary-600 px-6 py-2 text-white hover:bg-primary-700">
              Solicitar Preaprobado
            </button>
          </div>
        </article>
      </div>
      <article className="mx-auto mb-14 flex max-w-screen-2xl flex-col gap-10 px-6 md:px-14 lg:flex-row lg:px-20">
        <FinancingCard
          color="#7330f7"
          direction="horizontal"
          frontContent={
            <p className="ml-8 text-left text-3xl font-semibold text-[#7330f7] lg:mx-10 lg:text-5xl xl:m-20 xl:text-6xl">
              Crédito
              <br />
              Hipotecario
            </p>
          }
          content={
            <div className="flex flex-col gap-2 p-4 text-left text-xs text-black md:gap-3 md:p-8 md:text-sm xl:gap-4 xl:text-base">
              <h4 className="text-xl font-semibold xl:text-2xl">
                Crédito Hipotecario
              </h4>
              <p>
                Es un producto de financiación para comprar vivienda donde{" "}
                <span className="font-semibold">el cliente</span> figura como
                propietario del inmueble. El inmueble queda como garantía hasta
                completar el pago total de las cuotas.
              </p>
              <h5 className="text-base font-semibold xl:text-xl">
                Porcentaje de financiación
              </h5>
              <p>
                Hasta el <span className="text-[#7330f7]">70%</span> del valor
                total de la vivienda.
              </p>
              <table className="table-fixed border border-black">
                <thead>
                  <tr>
                    <th className="border border-black p-2 text-left">Plazo</th>
                    <th className="border border-black p-2 text-left">
                      Edad para acceder
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-2">
                      Desde 5 hasta 20 años*
                    </td>
                    <td className="border border-black p-2">
                      Entre los 18 y 72 años*
                    </td>
                  </tr>
                </tbody>
              </table>
              <h5 className="text-base font-semibold xl:text-xl">
                Escrituración
              </h5>
              <p>Al momento de la adquisición del inmueble.</p>
              <h5 className="text-base font-semibold xl:text-xl">
                ¿Quién es el propietario?
              </h5>
              <p>El cliente.</p>
              <div className="self-center">
                <button className="rounded-full bg-primary-600 px-6 py-2 text-white hover:bg-primary-700">
                  Solicitar Preaprobado
                </button>
              </div>
            </div>
          }
        />
        <FinancingCard
          color="black"
          content={
            <div className="flex flex-col gap-2 p-4 text-left text-xs text-black md:gap-3 md:p-8 md:text-sm xl:gap-4 xl:text-base">
              <h4 className="text-xl font-semibold xl:text-2xl">
                Leasing Habitacional
              </h4>
              <p>
                Es un producto de financiación para comprar vivienda donde el
                propietario será <span className="font-semibold">el banco</span>{" "}
                durante el contrato de leasing. Una vez se termine el periodo de
                dicho contrato, el cliente podrá ejercer la opción de compra.
              </p>
              <h5 className="text-base font-semibold xl:text-xl">
                Porcentaje de financiación
              </h5>
              <p>
                Hasta el <span className="text-[#7330f7]">80%</span> del valor
                total de la vivienda.
              </p>
              <table className="table-fixed border border-black">
                <thead>
                  <tr>
                    <th className="border border-black p-2 text-left">Plazo</th>
                    <th className="border border-black p-2 text-left">
                      Edad para acceder
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-black p-2">
                      Desde 5 hasta 20 años*
                    </td>
                    <td className="border border-black p-2">
                      Entre los 18 y 72 años*
                    </td>
                  </tr>
                </tbody>
              </table>
              <h5 className="text-base font-semibold xl:text-xl">
                Escrituración
              </h5>
              <p>
                Al momento de la adquisición del inmueble y al finalizar el
                leasing si se toma la opción de compra.
              </p>
              <h5 className="text-base font-semibold xl:text-xl">
                ¿Quién es el propietario?
              </h5>
              <p>
                El banco figura como propietario durante la vigencia del
                leasing. Al finalizar, el cliente tiene derecho a ejercer la
                opción de compra pactada desde el inicio con la entidad bancaria
                que va desde el 1% al 20% del valor de la financiación.
              </p>
              <div className="self-center">
                <button className="rounded-full bg-primary-600 px-6 py-2 text-white hover:bg-primary-700">
                  Solicitar Preaprobado
                </button>
              </div>
            </div>
          }
          direction="horizontal"
          frontContent={
            <p className="ml-8 text-left text-3xl font-semibold text-black lg:mx-10 lg:text-5xl xl:m-20 xl:text-6xl">
              Leasing
              <br />
              Habitacional
            </p>
          }
        />
      </article>
      <article className="mx-auto mb-20 flex max-w-screen-2xl flex-col gap-14 px-6 md:flex-row md:px-14 lg:px-20">
        <FinancingCard
          color="black"
          direction="vertical"
          frontContent={
            <div className="flex flex-col items-center justify-center gap-10 px-20 md:flex-row">
              <Image
                src="/financing/financing-1.png"
                alt="Requisitos para mi crédito"
                unoptimized
                width={200}
                height={200}
                className="max-h-[500px] w-auto"
              />
              <p className="text-center text-3xl font-semibold text-black md:text-left lg:mx-10 lg:text-5xl xl:m-20 xl:text-6xl">
                Requisitos
                <br />
                para mi crédito
              </p>
            </div>
          }
          content={
            <div className="flex rotate-180 flex-col gap-10 p-4 text-left text-black md:flex-row md:p-10 lg:p-14 xl:p-20">
              <div className="flex flex-1 flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14">
                <h4 className="text-2xl font-semibold xl:text-4xl">
                  Requisitos
                </h4>
                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <Check className="max-h-5 min-h-5 min-w-5 max-w-5 text-green-600" />
                    Ser colombiano residente en el exterior o extranjero casado
                    con colombiano residente en el exterior.
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="max-h-5 min-h-5 min-w-5 max-w-5 text-green-600" />
                    Tener entre 18 y 72 años.
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="max-h-5 min-h-5 min-w-5 max-w-5 text-green-600" />
                    Demostrar ingresos en el país de residencia.
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="max-h-5 min-h-5 min-w-5 max-w-5 text-green-600" />
                    No tener reportes negativos en las centrales de riesgos en
                    el país de residencia ni en Colombia.
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="max-h-5 min-h-5 min-w-5 max-w-5 text-green-600" />
                    Declaración de renta o de impuestos del año inmediatamente
                    anterior.
                  </li>
                </ul>
                <div className="self-center">
                  <button className="rounded-full bg-primary-600 px-6 py-2 text-white hover:bg-primary-700">
                    Solicitar Preaprobado
                  </button>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-4">
                <h4 className="text-2xl font-semibold text-primary-600 xl:text-4xl">
                  Tenemos alternativas
                </h4>
                <p className="text-lg font-light lg:text-xl">
                  ¡Si NO cumples con los requisitos, no te preocupes! ¡Te
                  brindaremos alternativas!
                </p>
                <div className="mt-4 self-center">
                  <button className="rounded-full bg-primary-600 px-6 py-2 text-lg text-white hover:bg-primary-700">
                    Solicitar contacto
                  </button>
                </div>
              </div>
            </div>
          }
        />
      </article>
      <article className="mx-auto mb-20 flex max-w-screen-2xl flex-col gap-10 px-6 md:px-14 lg:px-20">
        <h2 className="text-pretty text-center text-3xl font-semibold leading-snug md:w-1/2 md:text-left md:text-4xl lg:text-5xl">
          ¿Quieres saber cuál es la mejor opción para ti?
        </h2>
        <div className="relative grid grid-cols-2 justify-items-center md:grid-cols-3 md:px-6 xl:px-40">
          <div className="absolute bottom-0 left-0 right-0 -z-10 h-4 bg-primary-600" />
          <div className="hidden md:block" />
          <Image
            className="w-auto object-contain"
            src="/financing/financing-2.png"
            alt="¿Quieres saber cuál es la mejor opción de financiamiento para ti?"
            width={300}
            height={300}
          />
          <div className="flex flex-col items-center gap-6 md:gap-10">
            <h3 className="text-center text-2xl font-semibold leading-tight md:text-4xl lg:text-5xl">
              Nosotros te ayudamos
            </h3>
            <button className="rounded-full bg-primary-600 px-6 py-2 text-sm text-white hover:bg-primary-700 md:text-base">
              Solicitar Contacto
            </button>
          </div>
        </div>
      </article>
      <article className="mx-auto flex w-full max-w-screen-2xl flex-col gap-10 px-6 py-20 md:px-14 lg:px-20">
        <div className="md:w-1/2">
          <h2 className="text-pretty text-center text-3xl font-semibold leading-snug md:text-left md:text-4xl lg:text-5xl">
            Simulador de
            <br />
            CRÉDITO
          </h2>
          <p className="mt-4 text-xs">
            *Los resultados de este simulador son aproximaciones con fines
            informativos, los valores reales se establecerán con la entidad
            financiera en momento de la negociación del crédito o del
            desembolso.
          </p>
        </div>
        <div className="mt-10 w-full md:mt-16">
          <CreditSimulador price={0} />
        </div>
      </article>
      <article className="mx-auto mb-16 flex w-full max-w-screen-2xl flex-col gap-10 px-6 md:px-14 lg:px-20">
        <h2 className="text-pretty text-center text-3xl font-semibold md:text-left md:text-4xl lg:text-5xl">
          Preguntas FRECUENTES
        </h2>
        <FrequentlyQuestions />
      </article>
      <Footer />
    </main>
  );
}
