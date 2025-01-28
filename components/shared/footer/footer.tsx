import { AppButton } from "@/components/shared/app-button";
import { ContactButton } from "@/components/shared/contact-button";
import { SOCIAL_NETWORKS } from "@/constants/social-networks";
import { SignupNewsletter } from "@/components/shared/footer/signup-newsletter";

import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="relative mx-auto flex max-w-screen-2xl flex-col gap-6 px-6 py-16 md:gap-8 md:py-20 xl:gap-10">
        <ContactButton className="absolute bottom-40 right-4" />
        <AppButton className="absolute bottom-20 right-4" />
        <section className="grid grid-cols-1 justify-items-center gap-4 md:grid-cols-3">
          <div className="w-full">
            <SignupNewsletter />
          </div>
          <div className="flex w-full flex-col gap-4 md:w-auto md:gap-6">
            {FIRST_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-base hover:underline md:text-lg"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="flex w-full flex-col gap-4 md:gap-6">
            {SECOND_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-base hover:underline md:text-lg"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:justify-start">
          <div className="flex flex-1 gap-4">
            {SOCIAL_NETWORKS.map(({ link, img, name }) => (
              <a key={link} href={link} aria-label={link} target="_blank">
                <Image
                  unoptimized
                  className="aspect-square h-7 w-7 cursor-pointer transition-all ease-in hover:scale-105 hover:shadow-2xl md:h-9 md:w-9"
                  src={img}
                  width="36"
                  height="36"
                  alt={name}
                />
              </a>
            ))}
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-black">
            <Image
              unoptimized
              width="200"
              height="80"
              className="w-[130px] mix-blend-multiply md:w-[160px] lg:w-[180px]"
              src="/main-page/inverclick-logo.avif"
              alt="Inverclick logo"
            />
            <div className="flex gap-4 text-center text-xs font-light">
              <Link href="/policy" target="_blank">
                Políticas de privacidad
              </Link>
              <div className="border-r border-black" />
              <Link href="/terms-conditions" target="_blank">
                Términos y condiciones
              </Link>
            </div>
            <div className="flex gap-4 text-xs font-light">
              All rights reserved © {new Date().getFullYear()}
            </div>
          </div>
          <div className="flex-1" />
        </div>
      </div>
    </footer>
  );
};

const FIRST_LINKS = [
  { label: "Nosotros", href: "/" },
  { label: "Proyectos", href: "/projects" },
  { label: "Financiación", href: "/financing" },
  { label: "Otros servicios", href: "/" },
];

const SECOND_LINKS = [
  { label: "Simulador de crédito", href: "/financing" },
  { label: "Trabaja con nosotros", href: "/" },
  // { label: "Blog", href: "/" },
  { label: "Contacto", href: "/" },
];
