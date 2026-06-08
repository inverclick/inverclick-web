import { Footer } from "@/components/shared/footer/footer";
import { Header } from "@/components/shared/header/header";
import { ENV_VARS } from "@/global/env";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eliminación de cuenta de la app Inverclick",
  description:
    "Información para solicitar la eliminación de una cuenta y de los datos asociados en la app Inverclick.",
  robots: {
    index: false,
    follow: false,
  },
  alternates: {
    canonical: `${ENV_VARS.BASE_URL}/delete-account`,
  },
  openGraph: {
    url: `${ENV_VARS.BASE_URL}/delete-account`,
    title: "Eliminación de cuenta de Inverclick",
    description:
      "Pasos para solicitar a Inverclick S.A.S la eliminación de una cuenta y de los datos asociados en la app Inverclick.",
  },
};

const deletedData = [
  "Datos de identificación y perfil asociados a la cuenta, como nombre, apellidos y documento de identidad suministrado por el usuario.",
  "Datos de contacto asociados a la cuenta, como correo electrónico, teléfono y domicilio registrados en nuestros sistemas.",
  "Credenciales de acceso y registros de perfil utilizados para administrar la cuenta en la app y en la web.",
  "Preferencias de uso y otra información de navegación o actividad vinculada a la cuenta, siempre que no exista una obligación legal o contractual de conservarla.",
];

const retainedData = [
  "Registros o soportes que Inverclick S.A.S deba conservar para cumplir obligaciones legales, regulatorias, contractuales o atender requerimientos de autoridades.",
  "Información necesaria para la atención de reclamaciones, prevención de fraude, seguridad y defensa ante posibles responsabilidades legales o contractuales.",
  "Evidencias de autorizaciones, solicitudes y trazabilidad mínima del proceso de eliminación, cuando sea necesario para acreditar el cumplimiento de la petición.",
];

const steps = [
  "Envía un correo a tecnologia@inverclick.com desde el correo asociado a tu cuenta o indicando ese correo en el mensaje.",
  "Usa el asunto \"Solicitud de eliminación de cuenta Inverclick\".",
  "Incluye tu nombre completo, número de documento, correo registrado y, si aplica, número de teléfono para validar tu identidad.",
  "Indica expresamente que solicitas la eliminación de tu cuenta y de los datos personales asociados.",
  "Si necesitamos información adicional para validar la titularidad de la cuenta, te la pediremos por el mismo medio antes de completar el proceso.",
];

export default function AccountDeletionRequestPage() {
  return (
    <main>
      <Header />
      <article className="p-content mb-20 flex flex-col gap-8 py-10">
        <header className="flex flex-col gap-3">
          <span className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            App Inverclick
          </span>
          <h1 className="text-3xl font-medium sm:text-4xl">
            Solicitud de eliminación de cuenta y datos asociados
          </h1>
          <p className="max-w-3xl text-lg text-neutral-700">
            Esta página explica cómo los usuarios de la app <b>Inverclick</b>
            pueden solicitar a <b>Inverclick S.A.S</b> la eliminación de su
            cuenta y de los datos personales asociados.
          </p>
        </header>

        <section className="max-w-4xl space-y-4 text-lg text-neutral-800">
          <h2 className="text-2xl font-medium">Cómo solicitar la eliminación</h2>
          <ol className="ml-6 list-decimal space-y-3">
            {steps.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <p>
            Correo de contacto para esta solicitud: {" "}
            <a className="underline" href="mailto:tecnologia@inverclick.com">
              tecnologia@inverclick.com
            </a>
          </p>
        </section>

        <section className="max-w-4xl space-y-4 text-lg text-neutral-800">
          <h2 className="text-2xl font-medium">Datos que se eliminarán</h2>
          <p>
            Una vez validada la solicitud, <b>Inverclick S.A.S</b> eliminará o
            anonimizará de sus sistemas los datos vinculados a la cuenta que no
            deban conservarse por obligación legal o contractual.
          </p>
          <ul className="ml-6 list-disc space-y-3">
            {deletedData.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="max-w-4xl space-y-4 text-lg text-neutral-800">
          <h2 className="text-2xl font-medium">
            Datos que podrían conservarse y tiempo de retención adicional
          </h2>
          <p>
            Algunos datos podrán conservarse cuando exista un deber legal,
            regulatorio o contractual que impida su supresión inmediata.
          </p>
          <ul className="ml-6 list-disc space-y-3">
            {retainedData.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            Conforme a la política de tratamiento de datos de <b>Inverclick</b>,
            la conservación adicional aplica mientras los datos sean necesarios
            para mantener una relación comercial, laboral o civil con el titular
            y durante el periodo de prescripción legal ante posibles
            responsabilidades legales o contractuales.
          </p>
          <p>
            Si no existe una obligación de conservación, la supresión podrá
            solicitarse en cualquier momento.
          </p>
        </section>
      </article>
      <Footer />
    </main>
  );
}