import { CreditSimulador } from "@/components/financing/CreditSimulador";
import { FinancingCard } from "@/components/financing/FinancingCard";
import { MyFooter } from "@/components/shared/footer/MyFooter";
import { FrequentlyQuestions } from "@/components/shared/FrequentlyQuestions";
import { MyHeaderAllServices } from "@/components/shared/header/MyHeaderAllServices";
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
      <MyHeaderAllServices />
      <article className="px-6 sm:px-10 md:px-16 lg:px-20 xl:px-28 pt-20 md:pt-24 xl:pt- 28 flex flex-col mb-20">
       <section className="flex flex-col gap-16 md:gap-24 justify-center items-center h-[65vh] translate-y-5">
          <div className="flex gap-3 flex-col animate-blurred-fade-in">
            <h1 className="font-semibold text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl">Crédito de vivienda</h1>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold">Colombianos en <span className="text-primary-600">EL EXTERIOR</span></h2>
          </div>
        </section>
        <div className="my-10 self-center">
          <button className="px-6 text-white py-2 rounded-full bg-primary-600 hover:bg-primary-700 animate-fade-in-up">Solicitar Preaprobado</button>
        </div>
      </article>
      <article className="h-[calc(1.3*100vh)] md:h-[calc(100vh-100px)] w-full flex flex-col md:flex-row gap-10 md:gap-10 lg:gap-14 px-10 md:px-14 lg:px-20 mb-14">
        <FinancingCard  
          color="#7330f7"
          direction="horizontal"
          frontContent={
            <p className='ml-8 lg:mx-10 xl:m-20 text-4xl lg:text-5xl xl:text-6xl text-left font-semibold text-[#7330f7]'>
              Crédito
              <br />
              Hipotecario
            </p>
          } 
          content={
            <div className="p-4 md:p-8 text-black text-left flex flex-col gap-2 md:gap-3 xl:gap-4 text-xs md:text-sm xl:text-base ">
              <h4 className='text-xl xl:text-2xl font-semibold'>
                Crédito Hipotecario
              </h4>
              <p>Es un producto de financiación para comprar vivienda donde <span className="font-semibold">el cliente</span> figura como propietario del inmueble. El inmueble queda como garantía hasta completar el pago total de las cuotas.</p>
              <h5 className='text-base xl:text-xl font-semibold'>Porcentaje de financiación</h5>
              <p>Hasta el <span className="text-[#7330f7]">70%</span> del valor total de la vivienda.</p>
              <table className="table-fixed border border-black">
                <thead>
                  <tr>
                    <th className="p-2 text-left border border-black">Plazo</th>
                    <th className="p-2 text-left border border-black">Edad para acceder</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-black border">Desde 5 hasta 20 años*</td>
                    <td className="p-2 border-black border">Entre los 18 y 72 años*</td>
                  </tr>
                </tbody>
              </table>
              <h5 className='text-base xl:text-xl font-semibold'>Escrituración</h5>
              <p>Al momento de la adquisición del inmueble.</p>
              <h5 className='text-base xl:text-xl font-semibold'>¿Quién es el propietario?</h5>
              <p>El cliente.</p>
              <div className="self-center">
                <button className="px-6 text-white py-2 rounded-full bg-primary-600 hover:bg-primary-700">Solicitar Preaprobado</button>
              </div>
            </div>
          }
        />
         <FinancingCard  
          color="black"
          content={
            <div className="p-4 md:p-8 text-black text-left flex flex-col gap-2 md:gap-3 xl:gap-4 text-xs md:text-sm xl:text-base ">
              <h4 className='text-xl xl:text-2xl font-semibold'>
                Leasing Habitacional
              </h4>
              <p>Es un producto de financiación para comprar vivienda donde el propietario será <span className="font-semibold">el banco</span> durante el contrato de leasing. Una vez se termine el periodo de dicho contrato, el cliente podrá ejercer la opción de compra.</p>
              <h5 className='text-base xl:text-xl font-semibold'>Porcentaje de financiación</h5>
              <p>Hasta el <span className="text-[#7330f7]">80%</span> del valor total de la vivienda.</p>
              <table className="table-fixed border border-black">
                <thead>
                  <tr>
                    <th className="p-2 text-left border border-black">Plazo</th>
                    <th className="p-2 text-left border border-black">Edad para acceder</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-2 border-black border">Desde 5 hasta 20 años*</td>
                    <td className="p-2 border-black border">Entre los 18 y 72 años*</td>
                  </tr>
                </tbody>
              </table>
              <h5 className='text-base xl:text-xl font-semibold'>Escrituración</h5>
              <p>Al momento de la adquisición del inmueble y al finalizar el leasing si se toma la opción de compra.</p>
              <h5 className='text-base xl:text-xl font-semibold'>¿Quién es el propietario?</h5>
              <p>El banco figura como propietario durante la vigencia del leasing. Al finalizar, el cliente tiene derecho a ejercer la opción de compra pactada desde el inicio con la entidad bancaria que va desde el 1% al 20% del valor de la financiación.</p>
              <div className="self-center">
                <button className="px-6 text-white py-2 rounded-full bg-primary-600 hover:bg-primary-700">Solicitar Preaprobado</button>
              </div>
            </div>
          }
          direction="horizontal"
          frontContent={
            <p className='ml-8 lg:mx-10 xl:m-20 text-4xl lg:text-5xl xl:text-6xl text-left font-semibold text-black'>
              Leasing
              <br />
              Habitacional
            </p>
          } 
        />
      </article>
      <article className="h-screen md:h-[calc(100vh-200px)] w-full flex flex-col md:flex-row gap-14 px-10 md:px-14 lg:px-20 mb-20">
         <FinancingCard  
          color="black"
          direction="vertical"
          frontContent={
            <div className="flex flex-col md:flex-row gap-10 px-20 justify-center items-center">
              <Image 
                src='/financing/financing-1.png'
                alt="Requisitos para mi crédito"
                unoptimized
                width={200}
                height={200}
                className="max-h-[500px] w-auto"
              />
              <p className='ml-8 lg:mx-10 xl:m-20 text-4xl lg:text-5xl xl:text-6xl text-center md:text-left font-semibold text-black'>
                Requisitos 
                <br />
                para mi crédito
              </p>
            </div>
          } 
          content={
            <div className='flex flex-col md:flex-row gap-10 text-black rotate-180 px-4 md:px-10 lg:px-14 xl:px-20 text-left'>
              <div className="flex flex-1 flex-col gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-14">
                <h4 className='text-2xl xl:text-4xl font-semibold'>
                  Requisitos
                </h4>
                <ul className="flex flex-col gap-2">
                  <li className="flex gap-2 items-center">
                    <Check className="text-green-600 min-w-5 min-h-5 max-h-5 max-w-5"/>
                    Ser colombiano residente en el exterior o extranjero casado con colombiano residente en el exterior.
                  </li>
                  <li className="flex gap-2 items-center">
                    <Check className="text-green-600 min-w-5 min-h-5 max-h-5 max-w-5"/>
                    Tener entre 18 y 72 años.
                  </li>
                  <li className="flex gap-2 items-center">
                    <Check className="text-green-600 min-w-5 min-h-5 max-h-5 max-w-5"/>
                    Demostrar ingresos en el país de residencia.
                  </li>
                  <li className="flex gap-2 items-center">
                    <Check className="text-green-600 min-w-5 min-h-5 max-h-5 max-w-5"/>
                    No tener reportes negativos en las centrales de riesgos en el país de residencia ni en Colombia.
                  </li>
                  <li className="flex gap-2 items-center">
                    <Check className="text-green-600 min-w-5 min-h-5 max-h-5 max-w-5"/>
                    Declaración de renta o de impuestos del año inmediatamente anterior.
                  </li>
                </ul>
                <div className="self-center">
                  <button className="px-6 text-white py-2 rounded-full bg-primary-600 hover:bg-primary-700">Solicitar Preaprobado</button>
                </div>
              </div> 
              <div className="flex-1 flex flex-col justify-center gap-4">
                <h4 className='text-2xl xl:text-4xl font-semibold text-primary-600'>
                  Tenemos alternativas
                </h4>
                <p className='text-lg lg:text-xl font-light'>
                  ¡Si NO cumples con los requisitos, no te preocupes! ¡Te brindaremos alternativas!
                </p>
                <div className="self-center mt-4">
                  <button className="px-6 text-white py-2 rounded-full bg-primary-600 hover:bg-primary-700 text-lg">Solicitar contacto</button>
                </div>
              </div>
            </div>
          }
        />
      </article>
      <article className="h-screen md:h-[calc(100vh-180px)] w-full flex flex-col gap-10 px-10 md:px-14 lg:px-20 mb-20">
        <h2 className="text-pretty md:w-1/2 text-center md:text-left text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug">¿Quieres saber cuál es la mejor opción para ti?</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 justify-items-center relative md:px-10 xl:px-40">
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-primary-600 -z-10" />
          <div  className="hidden md:block"/>
          <Image className="2xl:min-h-[600px] w-auto" src='/financing/financing-2.png' alt="¿Quieres saber cuál es la mejor opción de financiamiento para ti?" width={300} height={300}  />
          <div className="flex flex-col gap-6 md:gap-10 items-center">
            <h3 className="text-center  text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight">Nosotros te ayudamos</h3>
            <button className="text-sm md:text-base px-6 text-white py-2 rounded-full bg-primary-600 hover:bg-primary-700">Solicitar Contacto</button>
          </div>
        </div>
      </article>
      <article className="w-full flex flex-col gap-10 px-10 md:px-14 lg:px-20 py-20">
        <div className="md:w-1/2">
        <h2 className="text-pretty text-center md:text-left text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug">Simulador de<br />CRÉDITO</h2>
        <p className="text-xs mt-4">*Los resultados de este simulador son aproximaciones con fines informativos, los valores reales se establecerán con la entidad financiera en el momento del desembolso.</p>
        </div>
        <div className="w-full mt-10 md:mt-16">
          <CreditSimulador />
        </div>
      </article> 
      <article className="h-screen md:h-[calc(100vh-180px)] w-full flex flex-col gap-10 px-10 md:px-14 lg:px-20">
        <h2 className="text-pretty text-center md:text-left text-3xl md:text-4xl lg:text-5xl font-semibold">Preguntas FRECUENTES</h2>
        <FrequentlyQuestions />
      </article>
      <MyFooter />
    </main>
  );
}