import { FinancingCard } from "@/components/financing/FinancingCard";
import { MyHeaderAllServices } from "@/components/shared/header/MyHeaderAllServices";
import { ENV_VARS } from "@/global/env";
import { Metadata } from "next";

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
          <div className="flex gap-3 flex-col">
            <h1 className="font-semibold text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl">Crédito de vivienda</h1>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-semibold">Colombianos en <span className="text-primary-600">EL EXTERIOR</span></h2>
          </div>
        </section>
        <div className="my-10 self-center">
          <button className="px-6 text-white py-2 rounded-full bg-primary-600 hover:bg-primary-700">Solicitar Preaprobado</button>
        </div>
      </article>
      <article className="h-screen md:h-[calc(100vh-200px)] w-full flex flex-col md:flex-row gap-14 px-10 md:px-14 lg:px-20 mb-20">
        <FinancingCard  
          color="#7330f7"
          text="Texto"
          title={["Crédito", "Hipotecario"]}
        />
        <FinancingCard  
          color="black"
          text="Texto"
          title={["Leasing", "Habitacional"]}
        />
      </article>
    </main>
  );
}