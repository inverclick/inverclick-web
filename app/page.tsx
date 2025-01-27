import { AppButton } from "@/components/shared/app-button";
import { LoginButton } from "@/components/shared/login-button";
import { DynamicPhrases } from "@/components/web/dynamic-phrases";
import { Searcher } from "@/components/web/searcher";
import { Services } from "@/components/web/services";
import { SOCIAL_NETWORKS } from "@/constants/social-networks";
import { supabase } from "@/services/supabase/supabase";
import { Department } from "@/types/domain/departments";

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
    <div className="absolute inset-0 flex h-screen flex-col lg:flex-row">
      {/* LEFT SECTION */}
      <section className="relative flex flex-col items-center justify-between gap-4 py-6 md:flex-1 md:items-start md:gap-0 md:px-10">
        <AppButton className="invisible absolute bottom-5 right-8" />
        <Image
          unoptimized
          className="absolute bottom-0 left-0 right-0 -z-10 h-full w-full object-cover"
          src="/main-page/main-background.avif"
          alt="Inverclick fondo de pantalla"
          width="1200"
          height="1200"
        />
        <Image
          unoptimized
          width="200"
          height="80"
          className="invisible mx-auto mb-8 w-[160px] animate-slide-in-top md:w-[220px] lg:mx-0"
          src="/main-page/inverclick-logo.avif"
          alt="Inverclick logo"
        />
        <div className="invisible flex w-full flex-grow flex-col md:mb-4 lg:mb-0">
          {/* Component to compensate for centering space */}
          <Services className="invisible !mb-0 hidden lg:flex" />
          <div className="flex w-full flex-grow animate-blurred-fade-in flex-col justify-center gap-6 pb-4">
            <DynamicPhrases />
          </div>
          <Services />
        </div>
        <div className="invisible flex gap-4">
          {SOCIAL_NETWORKS.map(({ link, img, name }) => (
            <Link key={link} href={link} aria-label={link} target="_blank">
              <Image
                unoptimized
                className="aspect-square h-7 w-7 cursor-pointer transition-all ease-in hover:scale-105 hover:shadow-2xl md:h-9 md:w-9"
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
      <section className="relative flex flex-1 animate-slide-in-bottom flex-col items-center justify-between rounded-t-2xl bg-primary-600 shadow-xl md:animate-slide-in-right lg:rounded-l-[40px] lg:rounded-r-none">
        {/* Element to compensate space for centering */}
        <footer className="invisible mt-8 hidden flex-col items-center justify-center gap-1 px-4 lg:flex">
          <Image
            unoptimized
            src="/main-page/logo_gris_inverclick.svg"
            className="mb-2 w-[60px] md:w-[90px]"
            width="100"
            height="40"
            alt="Inverclick logo gris"
          />
          <div className="flex gap-2 text-center text-xs font-light text-white/85">
            <Link href="/policy" target="_blank">
              Políticas de privacidad
            </Link>
            <div className="border bg-white/30"></div>
            <Link href="/terms-conditions" target="_blank">
              Términos y condiciones
            </Link>
          </div>
          <div className="flex gap-4 text-xs font-light text-white/85">
            All rights reserved © {new Date().getFullYear()}
          </div>
        </footer>

        <div className="invisible w-full">
          <header className="my-16 px-5 md:mt-16 md:px-16 lg:mb-16 lg:mt-0">
            <h1 className="text-center text-2xl font-semibold text-white md:text-3xl 2xl:text-5xl">
              <p>Inverclick, el mejor sitio</p>
              <p>
                para invertir en{" "}
                <span className="text-3xl md:text-4xl 2xl:text-6xl">
                  Colombia
                </span>
              </p>
            </h1>
          </header>

          <section className="mb-16 w-full px-4 md:px-16 lg:mb-0">
            <Searcher departments={departments} />
            <h3 className="mt-4 text-center text-sm text-white md:text-base">
              Casas - Apartamentos - Lotes - Fracciones
            </h3>
          </section>
        </div>

        <footer className="invisible mb-8 flex flex-col items-center justify-center gap-1 px-4">
          <Image
            unoptimized
            src="/main-page/logo_gris_inverclick.svg"
            className="mb-2 w-[60px] md:w-[90px]"
            width="100"
            height="40"
            alt="Inverclick logo gris"
          />
          <div className="flex gap-2 text-center text-xs font-light text-white/85">
            <Link href="/policy" target="_blank">
              Políticas de privacidad
            </Link>
            <div className="border bg-white/30"></div>
            <Link href="/terms-conditions" target="_blank">
              Términos y condiciones
            </Link>
          </div>
          <div className="flex gap-4 text-xs font-light text-white/85">
            All rights reserved © {new Date().getFullYear()}
          </div>
        </footer>

        <LoginButton className="invisible absolute bottom-16 right-4" />
      </section>
    </div>
  );
}

type Content = Readonly<{
  departments: Department[];
}>;

function Content({ departments }: Content) {
  return (
    <main className="absolute inset-0 mx-auto flex h-screen max-w-screen-5xl flex-col lg:flex-row">
      {/* LEFT SECTION */}
      <section className="relative flex flex-col items-center justify-between gap-4 py-6 md:flex-1 md:items-start md:gap-0 md:px-10">
        <AppButton className="absolute bottom-5 right-8" />
        <Image
          unoptimized
          className="absolute bottom-0 left-0 right-0 -z-10 h-full w-full object-cover"
          src="/main-page/main-background.avif"
          alt="Inverclick fondo de pantalla"
          width="1200"
          height="1200"
        />
        <Image
          unoptimized
          width="200"
          height="80"
          className="mx-auto mb-8 w-[160px] animate-slide-in-top md:w-[220px] lg:mx-0"
          src="/main-page/inverclick-logo.avif"
          alt="Inverclick logo"
        />
        <div className="flex w-full flex-grow flex-col md:mb-4 lg:mb-0">
          {/* Component to compensate for centering space */}
          <Services className="invisible !mb-0 hidden lg:flex" />
          <div className="flex w-full flex-grow animate-blurred-fade-in flex-col justify-center gap-6 pb-4">
            <DynamicPhrases />
          </div>
          <Services />
        </div>
        <div className="flex gap-4">
          {SOCIAL_NETWORKS.map(({ link, img, name }) => (
            <Link key={link} href={link} aria-label={link} target="_blank">
              <Image
                unoptimized
                className="aspect-square h-7 w-7 cursor-pointer transition-all ease-in hover:scale-105 hover:shadow-2xl md:h-9 md:w-9"
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
      <section className="relative flex flex-1 animate-slide-in-bottom flex-col items-center justify-between rounded-t-2xl md:animate-slide-in-right">
        {/* Element to compensate space for centering */}
        <footer className="invisible mt-8 hidden flex-col items-center justify-center gap-1 px-4 lg:flex">
          <Image
            unoptimized
            src="/main-page/logo_gris_inverclick.svg"
            className="mb-2 w-[60px] md:w-[90px]"
            width="100"
            height="40"
            alt="Inverclick logo gris"
          />
          <div className="flex gap-2 text-center text-xs font-light text-white/85">
            <Link href="/policy" target="_blank">
              Políticas de privacidad
            </Link>
            <div className="border bg-white/30"></div>
            <Link href="/terms-conditions" target="_blank">
              Términos y condiciones
            </Link>
          </div>
          <div className="flex gap-4 text-xs font-light text-white/85">
            All rights reserved © {new Date().getFullYear()}
          </div>
        </footer>
        <div className="w-full">
          <header className="my-16 px-5 md:mt-16 md:px-16 lg:mb-16 lg:mt-0">
            <h1 className="text-center text-2xl font-semibold text-white md:text-3xl lg:text-left 2xl:text-5xl">
              <p>Inverclick, el mejor sitio</p>
              <p>
                para invertir en{" "}
                <span className="text-3xl md:text-4xl 2xl:text-6xl">
                  Colombia
                </span>
              </p>
            </h1>
          </header>

          <section className="mb-16 w-full px-4 md:px-16 lg:mb-0">
            <Searcher departments={departments} />
            <h3 className="mt-4 text-center text-sm text-white md:text-base">
              Casas - Apartamentos - Lotes - Fracciones
            </h3>
          </section>
        </div>
        <footer className="mb-8 flex flex-col items-center justify-center gap-1 px-4">
          <Image
            unoptimized
            src="/main-page/logo_gris_inverclick.svg"
            className="mb-2 w-[60px] md:w-[90px]"
            width="100"
            height="40"
            alt="Inverclick logo gris"
          />
          <div className="flex gap-2 text-center text-xs font-light text-white/85">
            <Link href="/policy" target="_blank">
              Políticas de privacidad
            </Link>
            <div className="border bg-white/30"></div>
            <Link href="/terms-conditions" target="_blank">
              Términos y condiciones
            </Link>
          </div>
          <div className="flex gap-4 text-xs font-light text-white/85">
            All rights reserved © {new Date().getFullYear()}
          </div>
        </footer>
        <LoginButton className="absolute bottom-16 right-4" />
      </section>
    </main>
  );
}
