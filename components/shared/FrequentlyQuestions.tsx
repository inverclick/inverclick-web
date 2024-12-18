import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTriggerWithArrowFirst,
} from "@inverclick/inverclick-ui/accordion";

export const FrequentlyQuestions = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {DATA.map(({ label, content }, index) => (
        <AccordionItem value={"item-" + index} key={index}>
          <AccordionTriggerWithArrowFirst className="text-2xl !font-light">
            {label}
          </AccordionTriggerWithArrowFirst>
          <AccordionContent className="ml-14 text-lg">
            {content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

const DATA = [
  {
    label: "¿Puedo tramitar mi crédito desde mi país de residencia?",
    content:
      "En Inverclick te ayudamos a tramitar tu crédito 100% virtual, no es necesario que viajes a Colombia para el trámite y desembolso de tu crédito.",
  },
  {
    label: "¿Debo viajar a Colombia para comprar el inmueble?",
    content:
      "No es necesario, debes tener un apoderado en Colombia quien realizará todos los trámites por ti, nuestro equipo y el equipo juridico del banco te asesorarán en todo momento.",
  },
  {
    label: "¿Si el crédito no es aprobado, debo pagar el estudio?",
    content:
      "No, si el crédito no es aprobado no se debe pagar ningun monto o tarifa. El estudio es gratuito, solo se debe pagar la tarifa por el tramite y el compañamiento si el crédito es aprobado y decides tomarlo.",
  },
  {
    label: "¿En qué moneda será desembolsado mi crédito?",
    content:
      "Tanto el crédito como las cuotas a pagar serán en Pesos Colombianos (COP).",
  },
  {
    label: "¿Una vez se apruebe mi crédito debo empezar a pagar las cuotas?",
    content:
      "No, el crédito se comienza a pagar cuando se realice el desembolso por parte del banco a la constructora o propietario del inmueble.",
  },
];
