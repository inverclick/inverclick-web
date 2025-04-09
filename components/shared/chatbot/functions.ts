import {
  generateGoToProjectMessages,
  generateGoToProjectsMessages,
  generateGoToProjectsWithFiltersMessages,
  generateQuestionAboutProjectMessages,
  generateScheduleAnAppointmentMessages,
  generateSimulateCreditByQuotaValueMessages,
  generateSimulateCreditByValueHousingMessages,
} from "@/components/shared/chatbot/messages";
import { ENV_VARS } from "@/global/env";
import { getRandomElement } from "@/lib/get-random-element";
import { supabase } from "@/services/supabase/supabase";

export function getWelcomeMessage(name: string) {
  return `¡Hola, ${name}! Te damos la bienvenida al lugar donde tu inversión en Colombia comienza a hacerse realidad. Puedes preguntarme por métodos de financiación, simular un crédito o buscar proyectos inmobiliarios para invertir.`;
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
      .ilike("name", `${department}`)
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
      .ilike("name", `${city}`)
      .limit(1);

    const _city = data?.at(0);

    if (_city) {
      transformedFilters.push(`city=${_city.id}`);
    }
  }

  const output = JSON.stringify({
    action: "go_to_projects",
    response_message: getRandomElement(
      generateGoToProjectsWithFiltersMessages()
    ),
    params: {
      filter: fixedFilters
        .concat(transformedFilters)
        .join(",")
        .replace(/\s+/g, ""),
    },
  });

  return output;
}

export function goToProjects(params: {}) {
  const output = JSON.stringify({
    action: "go_to_projects",
    response_message: getRandomElement(generateGoToProjectsMessages()),
  });

  return output;
}

export function simulateCredit(params: {
  simulationType: "valueHousing" | "quotaValue";
  yearsFunding: number;
  // Value Housing
  housingValue: number;
  percentageFunding: number;
  // Quota value
  quotaValue: number;
}) {
  if (params.simulationType === "valueHousing") {
    return simulateCreditByValueHousing({
      housingValue: params.housingValue,
      percentageFunding: params.percentageFunding,
      yearsFunding: params.yearsFunding,
    });
  } else if (params.simulationType === "quotaValue") {
    return simulateCreditByQuotaValue({
      quotaValue: params.quotaValue,
      yearsFunding: params.yearsFunding,
    });
  }

  const output = JSON.stringify({
    response_message: "Necesito que me especifiques el tipo de simulación.",
  });

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
    data,
    amountFunded: amountFunded.toFixed(2),
    monthlyInterestRate: monthlyInterestRate.toFixed(6),
    response_message: getRandomElement(
      generateSimulateCreditByQuotaValueMessages()
    ),
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
    response_message: getRandomElement(
      generateSimulateCreditByValueHousingMessages()
    ),
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
    data,
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

  // First get all projects with a single query to reduce database calls
  const { data: projects } = await supabase
    .from("projects")
    .select("*, typologies(*)")
    .limit(50); // Limit for performance

  if (!projects || projects.length === 0) {
    return JSON.stringify({
      response_message: "No encontré proyectos disponibles actualmente.",
    });
  }

  // Try exact/close match first using SQL's built-in ILIKE
  const exactMatches = projects.filter((p) =>
    p.name.toLowerCase().includes(projectName.toLowerCase())
  );

  if (exactMatches.length > 0) {
    // Found direct match
    const project = exactMatches[0];
    return JSON.stringify({
      action: "go_to_project",
      _id: project.id,
      response_message: getRandomElement(generateGoToProjectMessages()).replace(
        "[nombre del proyecto]",
        project.name
      ),
      params: {
        project_id: project.id,
        typology_id: project.typologies[0].id,
      },
    });
  }

  // No exact match, find closest using simplified similarity
  let bestMatch = null;
  let bestScore = 0;

  for (const project of projects) {
    const score = simpleSimilarity(
      projectName.toLowerCase(),
      project.name.toLowerCase()
    );
    if (score > bestScore) {
      bestScore = score;
      bestMatch = project;
    }
  }

  // If we found a reasonably close match
  if (bestMatch && bestScore > 0.4) {
    return JSON.stringify({
      action: "suggest_project",
      response_message: `Quizás te refieres a "${bestMatch.name}". ¿Te gustaría ver este proyecto?`,
      params: {
        project_id: bestMatch.id,
        typology_id: bestMatch.typologies[0].id,
        suggested_name: bestMatch.name,
      },
    });
  }

  // No good match found
  return JSON.stringify({
    response_message: `No encontré el proyecto "${projectName}". ¿Quieres explorar otros proyectos disponibles?`,
  });
}

// Simple, efficient similarity function that works well for project names
function simpleSimilarity(s1: string, s2: string): number {
  // Convert strings to arrays
  const chars1 = s1.split("");
  const chars2 = s2.split("");

  // Create a set from the second string for faster lookups
  const set2: Set<string> = new Set(chars2);

  // Count common characters without iterating through the Set
  let intersection = 0;
  for (let i = 0; i < chars1.length; i++) {
    if (set2.has(chars1[i])) intersection++;
  }

  // Calculate Jaccard similarity
  const union = chars1.length + chars2.length - intersection;
  const jaccardSim = intersection / union;

  // Check for substring match (gives higher weight to this)
  const substringBonus = s2.includes(s1) || s1.includes(s2) ? 0.3 : 0;

  // Combined score (0.7 * character similarity + 0.3 potential substring bonus)
  return Math.min(jaccardSim * 0.7 + substringBonus, 1.0);
}

export async function questionAboutProject(params: { projectId: string }) {
  const url = `${ENV_VARS.SUPABASE_URL}/functions/v1/project-by-id/${params.projectId}`;

  const response = await fetch(url);
  const output = await response.json();

  return JSON.stringify({
    ...output.data,
    response_message: getRandomElement(generateQuestionAboutProjectMessages()),
  });
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

export async function scheduleAnAppointment(params: {
  projectName: string;
  email: string;
}) {
  let projectId: string | null = null;

  if (params.projectName !== "null") {
    const { data: project } = await supabase
      .from("projects")
      .select("id")
      .ilike("name", `%${params.projectName}%`)
      .single();

    projectId = project?.id || null;
  }

  const output = JSON.stringify({
    action: "schedule_an_appointment",
    response_message: `${getRandomElement(generateScheduleAnAppointmentMessages())}. Te llegará un correo de confirmación a: ${params.email || "No proporcionado"}.`,
    params: {
      projectId,
      projectName: params.projectName,
    },
  });

  return output;
}

export function voidFunction(params: {}) {
  const output = 0;

  return JSON.stringify(output);
}
