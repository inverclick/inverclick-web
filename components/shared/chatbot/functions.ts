import { supabase } from "@/services/supabase";

export function getWelcomeMessage(name: string) {
  return `¡Hola, ${name}! Te damos la bienvenida al lugar donde tu inversión en Colombia comienza a hacerse realidad.`;
}

export async function goToProjectsWithFilters(params: { filter: string }) {
  // INPUT filter = "max_price=150000000,department=Risaralda,city=Pereira,type=APARTAMENTO,housing_state=NEW"
  // OUTPUT filter = "max_price=150000000,department=27,city=3,type=APARTAMENTO,housing_state=NEW"

  const splittedFilters = params.filter.split(",");

  const fixedFilters = splittedFilters.filter((pair) => {
    const [key] = pair.split("=");
    return key !== "department" && key !== "city";
  });

  const department = splittedFilters
    .find((part) => part.startsWith("department="))
    ?.split("=")[1];

  const city = splittedFilters
    .find((part) => part.startsWith("city="))
    ?.split("=")[1];

  const transformedFilters: string[] = [];

  if (department) {
    const { data } = await supabase
      .from("departments")
      .select("id")
      .ilike("name", `${department}%`)
      .limit(1);

    const _department = data?.at(0);

    if (_department) {
      transformedFilters.push(`department=${_department.id}`);
    }
  }

  if (city) {
    const { data } = await supabase
      .from("cities")
      .select("id")
      .ilike("name", `${city}%`)
      .limit(1);

    const _city = data?.at(0);

    if (_city) {
      transformedFilters.push(`city=${_city.id}`);
    }
  }

  const data = {
    action: "go_to_projects",
    response_message:
      "¡Pereira! Qué excelente elección. Es una ciudad llena de oportunidades para invertir. Estas son las opciones que encontré para ti.','200 millones. Es un gran punto de partida para tu inversión. Aquí tienes las opciones que se ajustan perfectamente a ese presupuesto.'",
    params: {
      filter: fixedFilters
        .concat(transformedFilters)
        .join(",")
        .replace(/\s+/g, ""),
    },
  };

  const output = JSON.stringify(data);

  return output;
}

export default function goToProjects() {
  const data = {
    action: "go_to_projects",
    response_message:
      "¡Perfecto! Aquí tienes las mejores opciones para invertir en Colombia. ¿Quieres filtrar por ubicación, presupuesto, tipo de proyecto o tipo de propiedad?",
  };

  const output = JSON.stringify(data);

  return output;
}

export function simulateCreditByQuotaValue(params: {
  quotaValue: number;
  yearsFunding: number;
}) {
  const quotaValue = params.quotaValue;
  const yearsFunding = params.yearsFunding;

  const data = {
    response_message: `¡Perfecto! Vamos a calcular el monto total que puedes financiar con una cuota fija mensual de ${quotaValue}, a financiar en ${yearsFunding} años. Esto solo tomará un momento.`,
  };

  const effectiveAnnualInterest = 0.11;
  const monthlyInterestRate = Math.pow(1 + effectiveAnnualInterest, 1 / 12) - 1;
  const monthsFunding = yearsFunding * 12;

  const amountFunded =
    quotaValue *
    ((Math.pow(1 + monthlyInterestRate, monthsFunding) - 1) /
      (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, monthsFunding)));

  const output = {
    data: data,
    amountFunded: amountFunded.toFixed(2),
    monthlyInterestRate: monthlyInterestRate.toFixed(6),
    response_message: `Con una cuota fija de ${quotaValue} y un plazo de ${yearsFunding} años, puedes financiar hasta ${amountFunded.toFixed(
      2
    )}.`,
  };

  return JSON.stringify(output);
}

export function simulateCreditByValueHousing(params: {
  housingValue: number;
  percentageFunding: number;
  yearsFunding: number;
}) {
  const housingValue = params.housingValue;
  const percentageFunding = params.percentageFunding;
  const yearsFunding = params.yearsFunding;

  const data = {
    response_message: `¡Perfecto! Vamos a calcular cómo quedaría tu crédito para una vivienda de ${housingValue} con ${
      percentageFunding * 100
    }% de financiación a ${yearsFunding} años. Esto solo tomará un momento.`,
  };

  if (percentageFunding > 0.7) {
    throw new Error(
      "El porcentaje de financiación no puede ser mayor al 70% (0.7)."
    );
  }

  const effectiveAnnualInterest = 0.1645;
  const monthlyInterestRate = Math.pow(1 + effectiveAnnualInterest, 1 / 12) - 1;
  const amountFunded = housingValue * percentageFunding;
  const monthsFunding = yearsFunding * 12;

  const fixedQuota =
    (amountFunded *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, monthsFunding)) /
    (Math.pow(1 + monthlyInterestRate, monthsFunding) - 1);

  const insurance = fixedQuota * 0.06;
  const totalQuota = fixedQuota + insurance;

  const output = {
    data: data,
    amountFunded: amountFunded.toFixed(2),
    monthlyInterestRate: monthlyInterestRate.toFixed(6),
    fixedQuota: fixedQuota.toFixed(2),
    insurance: insurance.toFixed(2),
    totalQuota: totalQuota.toFixed(2),
  };

  return JSON.stringify({ output });
}

export async function goToProject(params: { projectName: string }) {
  const projectName = params.projectName;

  const { data: project } = await supabase
    .from("projects")
    .select("*, typologies(*)")
    .ilike("name", `%${projectName}%`)
    .single();

  if (!project) {
    const output = {
      response_message: `¡Ups! El proyecto ${projectName} no está disponible, pero tranquilo, tengo un ojo experto para encontrar alternativas increíbles. ¿Exploramos juntas opciones similares?`,
    };

    return JSON.stringify(output);
  }

  const projectId = project.id;
  const typologyId = project.typologies[0].id;

  const output = {
    action: "go_to_project",
    _id: projectId,
    response_message: `Claro que sí, aquí está el proyecto ${projectName}. Es una excelente opción para invertir. ¿Te gustaría saber más detalles o prefieres agendar una cita con uno de nuestros asesores?`,
    params: {
      project_id: projectId,
      typology_id: typologyId,
    },
  };

  return JSON.stringify(output);
}

export async function questionAboutProject(params: { projectId: string }) {
  const url = `https://lvptznfprobnfjquceok.supabase.co/functions/v1/project-by-id/${params.projectId}`;

  const response = await fetch(url);
  const output = await response.json();

  return JSON.stringify(output.data);
}

export async function questionAboutInverclick(params: { question: string }) {
  const output = `
App móvil - Inverclick

Si quieres más información puedes ingresar a este link: https://www.inverclick.com/app

Invierte en propiedad raíz desde EL EXTERIOR  
Descubre propiedades verificadas y seguras en Colombia. Inverclick te ofrece un acceso exclusivo a las mejores opciones.  
¡Descarga nuestra app y comienza tu búsqueda!  

Personaliza tu búsqueda usando filtros dinámicos.

Financiación - Inverclick

Si quieres más información puedes ingresar a este link: https://www.inverclick.com/financing

Crédito de vivienda para Colombianos en EL EXTERIOR  
Solicita tu preaprobado.

Ofrecemos dos clases de crédito:

1. Crédito Hipotecario  
 Es un producto de financiación para comprar vivienda donde el cliente figura como propietario del inmueble. El inmueble queda como garantía hasta completar el pago total de las cuotas.  

 - Porcentaje de financiación: Hasta el 70% del valor total de la vivienda.  
 - Plazo: Desde 5 hasta 20 años.  
 - Edad para acceder: Entre los 18 y 72 años.  

2. Leasing Habitacional  
 Es un producto de financiación donde el propietario será el banco durante el contrato de leasing. Al finalizar, el cliente podrá ejercer la opción de compra.  

 - Porcentaje de financiación: Hasta el 80% del valor total de la vivienda.  
 - Plazo: Desde 5 hasta 20 años.  
 - Edad para acceder: Entre los 18 y 72 años.  

Estos son los requisitos para solicitar un crédito:  
- Ser colombiano residente en el exterior o extranjero casado con colombiano residente en el exterior.  
- Tener entre 18 y 72 años.  
- Demostrar ingresos en el país de residencia.  

¡Si no cumples con los requisitos, te brindaremos alternativas!

Política de privacidad y tratamiento de datos personales - Inverclick

Si quieres más información puedes ingresar a este link: https://www.inverclick.com/policy

Inverclick S.A.S presenta la Política de Tratamiento de Datos Personales en cumplimiento de la Ley 1581 de 2012 y el Decreto 1074 de 2015.  

Incluye definiciones, marco normativo, derechos de los titulares, entre otros.

Términos y condiciones - Inverclick

Si quieres más información puedes ingresar a este link: https://www.inverclick.com/terms-conditions

Inverclick S.A.S es la sociedad titular de la marca y activos digitales. Los términos incluyen definiciones, condiciones generales, protección al consumidor, cesión de usuario y otros temas relevantes.
`;

  return JSON.stringify({ output });
}
