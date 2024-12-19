import { AppButton } from "@/components/shared/app-button";
import { ContactButton } from "@/components/shared/contact-button";
import { SOCIAL_NETWORKS } from "@/constants/social-networks";
import { SignupNewsletter } from "@/components/shared/footer/signup-newsletter";

import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-50">
      <div className="relative flex flex-col gap-6 md:gap-8 xl:gap-10 px-6 py-16 md:py-20 max-w-screen-2xl mx-auto">
        <ContactButton className="absolute right-4 bottom-40" />
        <AppButton className="absolute right-4 bottom-20" />
        <section className="grid grid-cols-1 md:grid-cols-3 justify-items-center gap-4">
          <div className="w-full">
            <SignupNewsletter />
          </div>
          <div className="w-full md:w-auto flex flex-col gap-4 md:gap-6">
            {FIRST_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-base md:text-lg hover:underline"
              >
                {label}
              </Link>
            ))}
          </div>
          <div className="w-full flex flex-col gap-4 md:gap-6">
            {SECOND_LINKS.map(({ href, label }) => (
              <Link
                key={label}
                href={href}
                className="text-base md:text-lg hover:underline"
              >
                {label}
              </Link>
            ))}
          </div>
        </section>
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-5">
          <div className="flex-1 flex gap-4">
            {SOCIAL_NETWORKS.map(({ link, img, name }) => (
              <a key={link} href={link} aria-label={link} target="_blank">
                <Image
                  unoptimized
                  className="aspect-square hover:shadow-2xl hover:scale-105 transition-all ease-in cursor-pointer w-7 h-7 md:w-9 md:h-9"
                  src={img}
                  width="36"
                  height="36"
                  alt={name}
                />
              </a>
            ))}
          </div>
          <div className="text-black flex flex-col gap-2 justify-center items-center">
            <Image
              unoptimized
              width="200"
              height="80"
              className="w-[130px] md:w-[160px] lg:w-[180px] mix-blend-multiply"
              src="/main-page/inverclick-logo.avif"
              alt="Inverclick logo"
            />
            <div className="flex gap-4 font-light text-xs text-center">
              <Link href="/policy" target="_blank">
                Políticas de privacidad
              </Link>
              <div className="border-r border-black" />
              <Link href="/terms-conditions" target="_blank">
                Términos y condiciones
              </Link>
            </div>
            <div className="flex gap-4 font-light text-xs">
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
  { label: "Blog", href: "/" },
  { label: "Contacto", href: "/" },
];
