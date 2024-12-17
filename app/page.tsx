import { AppButton } from "@/components/shared/AppButton";
import { ContactButton } from "@/components/shared/ContactButton";
import { SOCIAL_NETWORKS } from "@/components/shared/data/socialNetworks";
import { LoginButton } from "@/components/shared/LoginButton";
import { DynamicPhrases } from "@/components/web/DynamicPhrases";
import { Searcher } from "@/components/web/Searcher";
import { Services } from "@/components/web/services";
import { supabase } from "@/services/supabase";
import { Department } from "@/types/department";

import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const { data: departments } = await supabase.from("departments").select("*");

  return (
    <div className="relative">
      <ContentAsLayout departments={departments ?? []} />
      <Content departments={departments ?? []} />
    </div>
  );
}

type ContentAsLayoutProps = Readonly<{
  departments: Department[];
}>;

function ContentAsLayout({ departments }: ContentAsLayoutProps) {
  return (
    <div className="absolute inset-0 flex flex-col lg:flex-row h-screen">
      {/* LEFT SECTION */}
      <section className="md:flex-1 relative flex flex-col gap-4 md:gap-0 items-center md:items-start justify-between md:px-10 py-6">
        <AppButton className="absolute bottom-5 right-8 invisible" />
        <Image
          unoptimized
          className="absolute bottom-0 left-0 right-0 object-cover -z-10 h-full w-full"
          src="/main-page/main-background.avif"
          alt="Inverclick fondo de pantalla"
          width="1200"
          height="1200"
        />
        <Image
          unoptimized
          width="200"
          height="80"
          className="w-[160px] md:w-[220px] animate-slide-in-top mb-8 mx-auto lg:mx-0 invisible"
          src="/main-page/inverclick-logo.avif"
          alt="Inverclick logo"
        />
        <div className="flex-grow flex flex-col w-full md:mb-4 lg:mb-0 invisible">
          {/* Component to compensate for centering space */}
          <Services className="hidden lg:flex invisible !mb-0" />
          <div className="flex-grow pb-4 flex flex-col justify-center gap-6 animate-blurred-fade-in w-full">
            <DynamicPhrases />
          </div>
          <Services />
        </div>
        <div className="flex gap-4 invisible">
          {SOCIAL_NETWORKS.map(({ link, img, name }) => (
            <Link key={link} href={link} aria-label={link} target="_blank">
              <Image
                unoptimized
                className="aspect-square hover:shadow-2xl hover:scale-105 transition-all ease-in cursor-pointer w-7 h-7 md:w-9 md:h-9"
                src={img}
                width="36"
                height="36"
                alt={name}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* RIGHT SECTION */}
      <section className="animate-slide-in-bottom md:animate-slide-in-right flex-1 rounded-t-2xl lg:rounded-l-[40px] lg:rounded-r-none shadow-xl bg-primary-600 flex flex-col justify-between items-center relative">
        {/* Element to compensate space for centering */}
        <footer className="hidden lg:flex flex-col justify-center items-center gap-1 px-4 mt-8 invisible">
          <Image
            unoptimized
            src="/main-page/logo_gris_inverclick.svg"
            className="mb-2 w-[60px] md:w-[90px]"
            width="100"
            height="40"
            alt="Inverclick logo gris"
          />
          <div className="flex gap-2 text-white/85 font-light text-xs text-center">
            <Link href="/policy" target="_blank">
              Políticas de privacidad
            </Link>
            <div className="border bg-white/30"></div>
            <Link href="/terms-conditions" target="_blank">
              Términos y condiciones
            </Link>
          </div>
          <div className="flex gap-4 text-white/85 font-light text-xs">
            All rights reserved © {new Date().getFullYear()}
          </div>
        </footer>

        <div className="w-full invisible">
          <header className="px-5 md:px-16 my-16 md:mt-16 lg:mt-0 lg:mb-16">
            <h1 className="text-center text-2xl md:text-3xl 2xl:text-5xl font-semibold text-white">
              <p>Inverclick, el mejor sitio</p>
              <p>
                para invertir en{" "}
                <span className="text-3xl md:text-4xl 2xl:text-6xl">
                  Colombia
                </span>
              </p>
            </h1>
          </header>

          <section className="w-full mb-16 px-4 md:px-16 lg:mb-0">
            <Searcher departments={departments} />
            <h3 className="text-center mt-4 text-white text-sm md:text-base">
              Casas - Apartamentos - Lotes - Fracciones
            </h3>
          </section>
        </div>

        <footer className="flex flex-col justify-center items-center gap-1 px-4 mb-8 invisible">
          <Image
            unoptimized
            src="/main-page/logo_gris_inverclick.svg"
            className="mb-2 w-[60px] md:w-[90px]"
            width="100"
            height="40"
            alt="Inverclick logo gris"
          />
          <div className="flex gap-2 text-white/85 font-light text-xs text-center">
            <Link href="/policy" target="_blank">
              Políticas de privacidad
            </Link>
            <div className="border bg-white/30"></div>
            <Link href="/terms-conditions" target="_blank">
              Términos y condiciones
            </Link>
          </div>
          <div className="flex gap-4 text-white/85 font-light text-xs">
            All rights reserved © {new Date().getFullYear()}
          </div>
        </footer>

        <LoginButton className="absolute bottom-16 right-4 invisible" />
        <ContactButton className="absolute bottom-4 right-4 invisible" />
      </section>
    </div>
  );
}

type Content = Readonly<{
  departments: Department[];
}>;

function Content({ departments }: Content) {
  return (
    <main className="absolute inset-0 flex flex-col lg:flex-row h-screen max-w-screen-5xl mx-auto">
      {/* LEFT SECTION */}
      <section className="md:flex-1 relative flex flex-col gap-4 md:gap-0 items-center md:items-start justify-between md:px-10 py-6">
        <AppButton className="absolute bottom-5 right-8" />
        <Image
          unoptimized
          className="absolute bottom-0 left-0 right-0 object-cover -z-10 h-full w-full"
          src="/main-page/main-background.avif"
          alt="Inverclick fondo de pantalla"
          width="1200"
          height="1200"
        />
        <Image
          unoptimized
          width="200"
          height="80"
          className="w-[160px] md:w-[220px] animate-slide-in-top mb-8 mx-auto lg:mx-0"
          src="/main-page/inverclick-logo.avif"
          alt="Inverclick logo"
        />
        <div className="flex-grow flex flex-col w-full md:mb-4 lg:mb-0">
          {/* Component to compensate for centering space */}
          <Services className="hidden lg:flex invisible !mb-0" />
          <div className="flex-grow pb-4 flex flex-col justify-center gap-6 animate-blurred-fade-in w-full">
            <DynamicPhrases />
          </div>
          <Services />
        </div>
        <div className="flex gap-4">
          {SOCIAL_NETWORKS.map(({ link, img, name }) => (
            <Link key={link} href={link} aria-label={link} target="_blank">
              <Image
                unoptimized
                className="aspect-square hover:shadow-2xl hover:scale-105 transition-all ease-in cursor-pointer w-7 h-7 md:w-9 md:h-9"
                src={img}
                width="36"
                height="36"
                alt={name}
              />
            </Link>
          ))}
        </div>
      </section>

      {/* RIGHT SECTION */}
      <section className="animate-slide-in-bottom md:animate-slide-in-right flex-1 rounded-t-2xl flex flex-col justify-between items-center relative">
        {/* Element to compensate space for centering */}
        <footer className="hidden lg:flex invisible flex-col justify-center items-center gap-1 px-4 mt-8">
          <Image
            unoptimized
            src="/main-page/logo_gris_inverclick.svg"
            className="mb-2 w-[60px] md:w-[90px]"
            width="100"
            height="40"
            alt="Inverclick logo gris"
          />
          <div className="flex gap-2 text-white/85 font-light text-xs text-center">
            <Link href="/policy" target="_blank">
              Políticas de privacidad
            </Link>
            <div className="border bg-white/30"></div>
            <Link href="/terms-conditions" target="_blank">
              Términos y condiciones
            </Link>
          </div>
          <div className="flex gap-4 text-white/85 font-light text-xs">
            All rights reserved © {new Date().getFullYear()}
          </div>
        </footer>
        <div className="w-full">
          <header className="px-5 md:px-16 my-16 md:mt-16 lg:mt-0 lg:mb-16">
            <h1 className="text-center lg:text-left text-2xl md:text-3xl 2xl:text-5xl font-semibold text-white">
              <p>Inverclick, el mejor sitio</p>
              <p>
                para invertir en{" "}
                <span className="text-3xl md:text-4xl 2xl:text-6xl">
                  Colombia
                </span>
              </p>
            </h1>
          </header>

          <section className="w-full mb-16 px-4 md:px-16 lg:mb-0">
            <Searcher departments={departments} />
            <h3 className="text-center mt-4 text-white text-sm md:text-base">
              Casas - Apartamentos - Lotes - Fracciones
            </h3>
          </section>
        </div>
        <footer className="flex flex-col justify-center items-center gap-1 px-4 mb-8">
          <Image
            unoptimized
            src="/main-page/logo_gris_inverclick.svg"
            className="mb-2 w-[60px] md:w-[90px]"
            width="100"
            height="40"
            alt="Inverclick logo gris"
          />
          <div className="flex gap-2 text-white/85 font-light text-xs text-center">
            <Link href="/policy" target="_blank">
              Políticas de privacidad
            </Link>
            <div className="border bg-white/30"></div>
            <Link href="/terms-conditions" target="_blank">
              Términos y condiciones
            </Link>
          </div>
          <div className="flex gap-4 text-white/85 font-light text-xs">
            All rights reserved © {new Date().getFullYear()}
          </div>
        </footer>
        <LoginButton className="absolute bottom-16 right-4" />,
        {/* <ContactButton className="absolute bottom-4 right-4" /> */}
      </section>
    </main>
  );
}
