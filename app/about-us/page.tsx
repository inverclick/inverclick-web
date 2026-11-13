import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";
import { ENV_VARS } from "@/global/env";
import {
  Building2,
  CreditCard,
  Link2,
  ShieldCheck,
  UsersRound,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import styles from "./page.module.css";

const description =
  "Conectamos a los colombianos en el exterior con oportunidades para invertir, acceder a financiación y cuidar de su familia en Colombia.";

export const metadata: Metadata = {
  title: "Nosotros",
  description,
  alternates: { canonical: `${ENV_VARS.BASE_URL}/about-us` },
  openGraph: {
    title: "Nosotros | Inverclick",
    description,
    url: `${ENV_VARS.BASE_URL}/about-us`,
    type: "website",
    locale: "es_CO",
    images: [
      {
        url: `${ENV_VARS.BASE_URL}/about-us/familia.webp`,
        width: 1920,
        height: 768,
        alt: "Una familia comparte un momento en su hogar",
      },
    ],
  },
};

const services = [
  {
    icon: Building2,
    title: "Invierte en Colombia",
    description:
      "Descubre proyectos inmobiliarios y oportunidades para construir valor desde el exterior.",
  },
  {
    icon: CreditCard,
    title: "Accede a financiación",
    description:
      "Te acompañamos en soluciones de crédito hipotecario, leasing, libre inversión y remodelación con entidades aliadas.",
  },
  {
    icon: ShieldCheck,
    title: "Protege lo que más quieres",
    description:
      "Conoce opciones de seguros, medicina prepagada, plan dental y servicios de protección familiar en Colombia.",
  },
];

const values = [
  {
    icon: Zap,
    title: "Simplicidad",
    description: "Procesos claros y digitales.",
  },
  {
    icon: ShieldCheck,
    title: "Confianza",
    description: "Aliados estratégicos y decisiones informadas.",
  },
  {
    icon: UsersRound,
    title: "Acompañamiento",
    description: "Tecnología con atención humana.",
  },
  {
    icon: Link2,
    title: "Conexión",
    description: "Acercamos Colombia a quienes viven en el exterior.",
  },
];

export default function AboutUsPage() {
  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.hero} aria-labelledby="about-title">
          <div className={styles.heroImage}>
            <Image
              src="/about-us/familia.webp"
              alt="Una familia sonríe mientras comparte un momento en casa"
              fill
              priority
              sizes="100vw"
            />
          </div>
          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>Nosotros</p>
              <h1 id="about-title">
                Conectamos tus <span>oportunidades</span> con Colombia
              </h1>
              <p className={styles.introduction}>
                En Inverclick somos un ecosistema digital creado para facilitar
                la vida de los colombianos en el exterior. Conectamos personas,
                oportunidades y aliados estratégicos para invertir, acceder a
                financiación y cuidar de su familia en Colombia.
              </p>
              <Link href="/projects" className={styles.button}>
                Conoce nuestros proyectos
              </Link>
            </div>
          </div>
        </section>

        <div className={styles.container}>
          <section className={styles.purpose} aria-labelledby="purpose-title">
            <div>
              <p className={styles.eyebrow}>Nuestro propósito</p>
              <h2 id="purpose-title">
                Simplificamos la distancia.
                <br />
                Conectamos oportunidades.
              </h2>
            </div>
            <p className={styles.purposeDescription}>
              Queremos que cada colombiano en el exterior pueda seguir
              construyendo su futuro y el de su familia en Colombia, sin
              importar dónde se encuentre.
            </p>
          </section>

          <section
            id="servicios"
            className={styles.services}
            aria-labelledby="services-title"
          >
            <h2 id="services-title">¿Qué hacemos?</h2>
            <div className={styles.serviceGrid}>
              {services.map(({ icon: Icon, title, description }) => (
                <article key={title} className={styles.serviceCard}>
                  <Icon aria-hidden="true" size={44} strokeWidth={1.7} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className={styles.values} aria-labelledby="values-title">
            <h2 id="values-title">Lo que nos hace diferentes</h2>
            <div className={styles.valueGrid}>
              {values.map(({ icon: Icon, title, description }) => (
                <article key={title} className={styles.valueCard}>
                  <div className={styles.valueIcon}>
                    <Icon aria-hidden="true" size={30} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className={styles.contact} aria-labelledby="contact-title">
          <Image
            src="/about-us/hogar.webp"
            alt=""
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className={styles.contactImage}
          />
          <div className={styles.contactContent}>
            <h2 id="contact-title">Colombia sigue cerca de ti</h2>
            <p>
              En Inverclick te ayudamos a dar el siguiente paso para invertir,
              proteger y construir valor en Colombia.
            </p>
            <a
              href="mailto:contactenos@inverclick.com?subject=Quiero%20contactar%20con%20un%20asesor"
              className={styles.button}
            >
              Contactar con un asesor
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
