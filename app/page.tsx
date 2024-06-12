import Image from "next/image";
import { LoginButton } from "@/components/shared/LoginButton";
import { ContactButton } from "@/components/shared/ContactButton";
import { SOCIAL_NETWORKS } from "@/components/shared/data/socialNetworks";
import { DynamicPhrases } from "@/components/web/DynamicPhrases";
import Link from "next/link";
import { AppButton } from "@/components/shared/AppButton";

const SERVICES = [
  {
    title: '¿Necesitas dinero para invertir?',
    description: 'Crédito Hipotecario, Leasing Habitacional',
    link: '/financing',
    buttonLabel: 'Solicitar',
  },
  {
    title: 'Conoce nuestros proyectos',
    description: 'Casas, apartamentos, lotes, bodegas',
    link: '/projects',
    buttonLabel: 'Explorar',
  },
  {
    title: 'Otros servicios',
    description: 'Seguros, cuentas de ahorro, envío de divisas',
    link: '/',
    buttonLabel: 'Ver más',
  },
];

export default function Home() {
  return (
    <section className="h-screen w-screen flex flex-col justify-center items-center gap-2">
    <h2 className="text-5xl text-primary-700">Inverclick</h2>
    <p className="text-2xl mb-4">¡Próximamente!</p>
    <p className="text-xl mb-4">Invierte en Propiedad Raíz desde <span className="font-semibold">EL EXTERIOR</span></p>
    {/* <Link href="/" className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md">
      Volver al inicio
    </Link> */}
    <Image
      unoptimized
      className='absolute bottom-0 left-0 right-0 object-cover -z-10 h-full w-full'
      src='/main-page/main-background.avif'
      alt='Inverclick fondo de pantalla'
      width='1200'
      height='1200'
    />
  </section>
  //   <main className='flex flex-col md:flex-row h-screen bg-'>
  //   <section
  //     className='md:flex-1 relative flex flex-col gap-4 md:gap-0 items-center md:items-start justify-between md:pl-10 py-6'
  //   >
  //     <AppButton />
  //     <Image
  //       unoptimized
  //       className='absolute bottom-0 left-0 right-0 object-cover -z-10 h-full w-full'
  //       src='/main-page/main-background.avif'
  //       alt='Inverclick fondo de pantalla'
  //       width='1200'
  //       height='1200'
  //     />
  //     <Image
  //       unoptimized
  //       width='200'
  //       height='80'
  //       className='w-[160px] md:w-[220px] animate-slide-in-top'
  //       src='/main-page/inverclick-logo.avif'
  //       alt='Inverclick logo'
  //     />
  //     <div className="pb-4 md:pb-32 flex flex-col gap-6 animate-blurred-fade-in">
  //       <h1
  //         className='text-lg md:text-3xl text-center md:text-left'
  //       >
  //         Invierte en Propiedad Raíz desde <span className="font-semibold">EL EXTERIOR</span>
  //       </h1>
  //       <DynamicPhrases />
  //     </div>
  //     <div className='flex gap-4'>
  //       {
  //         SOCIAL_NETWORKS.map(({ link, img, name }) => (
  //           <Link key={link} href={link} aria-label={link} target='_blank'>
  //             <Image
  //               unoptimized
  //               className='aspect-square hover:shadow-2xl hover:scale-105 transition-all ease-in cursor-pointer w-7 h-7 md:w-9 md:h-9'
  //               src={img}
  //               width='36'
  //               height='36'
  //               alt={name}
  //             />
  //           </Link>
  //         ))
  //       }
  //     </div>
  //   </section>

  //   <section
  //     className='animate-slide-in-bottom md:animate-slide-in-right flex-1 rounded-t-2xl md:rounded-l-[40px] md:rounded-r-none shadow-xl bg-primary-600 flex flex-col justify-around items-center relative'
  //   >
  //     <header className='text-center text-white flex flex-col gap-2'>
  //       <h2 className='pt-6 md:pt-0 text-2xl md:text-3xl 2xl:text-4xl'>
  //         <b>Bienvenidos</b> <span className="font-light">a inverclick</span>
  //       </h2>
  //       <h3 className='font-light max-w-sm self-center text-sm md:text-lg'>
  //         La mejor opción para invertir en propiedad raíz en COLOMBIA.
  //       </h3>
  //     </header>

  //     <div className='flex flex-col gap-10 2xl:gap-14'>
  //       {
  //         SERVICES.map((service, index) => (
  //           <article key={index} className='flex flex-col lg:flex-row gap-2 lg:gap-4 justify-center items-center'>
  //             <div className='text-white flex flex-col gap-2 lg:gap-4  w-[300px] 2xl:w-[450px]'>
  //               <h2 className='text-center font-medium text-base md:text-lg 2xl:text-xl'>{service.title}</h2>
  //               <h3 className='font-light lg:pl-4 lg:border-l-2 border-white text-center text-base md:text-base 2xl:text-lg'>
  //                 {service.description}
  //               </h3>
  //             </div>
  //             <Link
  //               href={service.link}
  //               className='text-primary-600 text-sm md:text-lg font-semibold px-6 py-2 rounded-3xl bg-white hover:shadow-2xl hover:scale-105 transition-all ease-in'
  //             >
  //               {service.buttonLabel}
  //             </Link>
  //           </article>
  //         ))
  //       }
  //     </div>

  //     <footer className='flex flex-col justify-center items-center gap-2 px-4'>
  //       <Image
  //         unoptimized
  //         src='/main-page/logo_gris_inverclick.svg'
  //         className='mb-2 w-[80px] md:w-[130px]'
  //         width='100'
  //         height='40'
  //         alt='Inverclick logo gris'
  //       />
  //       <div
  //         className='flex gap-4 text-white/85 font-light text-xs md:text-sm text-center'
  //       >
  //         Políticas de privacidad
  //         <div className='border bg-white/30'></div>
  //         Términos y condiciones
  //       </div>
  //       <div className='flex gap-4 text-white/85 font-light text-xs md:text-sm'>
  //         All rights reserved © {new Date().getFullYear()}
  //       </div>
  //     </footer>

  //     <LoginButton />
  //     <ContactButton />
  //   </section>
  // </main>
  );
}
