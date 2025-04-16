export const NO_CONTENT_MESSAGE =
  "¡Uy {UserName}! Algo se complicó y no tengo respuesta por el momento.";

export const UNKNOWN_ERROR_MESSAGE =
  "¡Uy, algo salió mal y no pude procesar tu solicitud.";

export function generateGoToProjectsMessages() {
  return [
    `¡{UserName}! ¿Te imaginas disfrutando un cafecito en tu nuevo hogar acá en Colombia? ¡Vamos a hacerlo realidad! Puedes preguntarme por propiedades por ubicación, rango de precios o tipo de inmueble. O si prefieres, ponte en contacto con uno de nuestros asesores, ¿qué dices?`,
    `¡{UserName}! ¿Te imaginas despertar en tu nuevo hogar con esa vista de ensueño? Vamos a hacerlo realidad. Puedes preguntarme por propiedades según ubicación, precio o tipo de inmueble. O si lo prefieres, ponte en contacto con uno de nuestros asesores. ¡Tú decides!`,
    `¡Vamos por esa inversión ideal, {UserName}! En Colombia hay oportunidades bacanas que te están esperando. Cuéntame qué te interesa: ubicación, precio o tipo de inmueble, y te enseño las mejores opciones. O si prefieres, ponte en contacto con uno de nuestros asesores para revisar todo a detalle, ¿va?`,
    `¡Imagínate, {UserName}, compartiendo momentos inolvidables en tu nuevo hogar! ¿Qué te parece si exploramos algunas opciones? Dime el rango de precios, la ubicación o el tipo de propiedad que buscas y vamos encontrando la ideal. También puedes ponerte en contacto con uno de nuestros asesores para que te ayude.`,
    `¡Ahora es el momento perfecto para invertir en Colombia, {UserName}! ¿Te animas a descubrir propiedades en una ubicación específica, en un rango de precios o según el tipo de inmueble? Dime qué buscas y te muestro las mejores opciones. También puedes ponerte en contacto con uno de nuestros asesores para revisar todo con detalle. ¡Estoy aquí para ayudarte!`,
    `¡Aquí arrancamos la búsqueda de tu gran inversión, {UserName}! Cuéntame, ¿qué es lo más importante para ti: ubicación, precio o tipo de propiedad? Con gusto te muestro opciones que se ajusten a lo que buscas, o si prefieres, ponte en contacto con uno de nuestros asesores para explorarlo juntos`,
  ];
}

export function generateGoToProjectsWithFiltersMessages() {
  return [
    `¡Excelente elección, {UserName}! Encontré varias opciones que te pueden encantar. Aquí tienes algunas propiedades que se ajustan a lo que buscas. Si quieres afinar la búsqueda con más filtros o conocer más detalles de algún proyecto, solo dime y lo revisamos juntos.`,
    `!{UserName}! Tenemos proyectos de primera para ti. Aquí están las opciones disponibles. ¿Quieres filtrar por rango de precios o tipo de propiedad? Dime y te doy una mano.`,
    `¡De una, {UserName}! Aquí te dejo las opciones con los filtros que pediste. Si necesitas ajustar el rango o ver otros proyectos, avísame y lo revisamos.`,
    `¡Entendido, {UserName}! Estas son las opciones disponibles. Si quieres ver más detalles de algún proyecto o agregar otro filtro, dime y seguimos buscando juntos.`,
    `¡Buenísima elección, {UserName}! Aquí tienes las opciones de inversión que tenemos. Si necesitas explorar más o cambiar algún filtro, avísame, estoy para ayudarte.`,
    `¡Aquí te dejo tus resultados, {UserName}! Si quieres ajustar la búsqueda, por ejemplo, expandir el rango de precios, solo dime. También puedes ponerte en contacto con uno de nuestros asesores para revisar las opciones a fondo.`,
    `¡Me encanta lo que elegiste, {UserName}! Aquí tienes algunas opciones dentro del rango que indicaste. Si crees que falta algo o quieres ver otras alternativas, dime y seguimos buscando hasta dar con la ideal para ti.`,
  ];
}

export function generateGoToProjectMessages() {
  return [
    `¡Aquí lo tienes, {UserName}! Este es el proyecto [nombre del proyecto], una gran oportunidad de inversión. Cuéntame, ¿quieres conocer más detalles, simular un crédito o prefieres que te pongas en contacto con uno de nuestros asesores para hablarlo?`,
    `¡Mira, {UserName}, te aseguro que te va a encantar! Este es el proyecto [nombre del proyecto], una opción con mucho potencial. Si quieres ver propiedades similares, calcular un crédito o ponerte en contacto con uno de nuestros asesores, dime y lo revisamos juntos.`,
    `¡Excelente elección, {UserName}! Ya te presento el proyecto [nombre del proyecto]. Si quieres saber más sobre su ubicación, beneficios o formas de financiación, dime y te ayudo con lo que necesites. O si prefieres, ponte en contacto con uno de nuestros asesores, ¿qué dices?`,
    `Aquí tienes el proyecto [nombre del proyecto], {UserName}. Si quieres saber más sobre sus características, cómo financiarlo, ver alternativas similares o ponerte en contacto con uno de nuestros asesores, dime y te echo una mano.`,
    `Te presento el proyecto [nombre del proyecto], {UserName}. ¿Quieres saber más sobre su ubicación, diseño o precios? Si prefieres, también podemos hacer una simulación de crédito o ponerte en contacto con uno de nuestros asesores para resolver todas tus preguntas.`,
  ];
}

export function generateSimulateCreditByValueHousingMessages() {
  return [
    `¡Vamos a hacerlo, {UserName}! Solo dime el valor de la vivienda, el porcentaje de financiación (hasta un 70%) y el plazo del crédito (de 5 a 20 años). ¡Te hago la simulación!`,
    `¡Perfecto, {UserName}! Para simular tu crédito por el valor de la vivienda, solo necesito que me digas el valor de la propiedad, el porcentaje de financiación (máximo 70%) y el plazo (de 5 a 20 años). ¿Me compartes esos datos?`,
    `¡De una, {UserName}! Cuéntame el valor de la vivienda que tienes en mente, el porcentaje que te gustaría financiar y en cuántos años quieres pagarlo, y te preparo una simulación clara y completa.`,
    `Por supuesto, {UserName}. Para armar la simulación del crédito, necesito que me indiques el valor de la propiedad, el porcentaje de financiación (hasta un 70%) y el plazo del crédito (entre 5 y 20 años). Con esos datos, te presento los detalles.`,
    `¡Claro, {UserName}! Dame el valor de la propiedad, el porcentaje de financiación que deseas y el plazo del crédito, y con gusto te muestro cómo quedarían las cuotas mensuales.`,
  ];
}

export function generateSimulateCreditByQuotaValueMessages() {
  return [
    `¡Entendido, {UserName}! Para simular un crédito basado en el valor de la cuota, necesito saber el monto de la cuota que deseas pagar y el plazo del crédito (de 5 a 20 años). ¿Me compartes esos datos para comenzar?`,
    `¡Perfecto, {UserName}! Dime cuánto te gustaría pagar de cuota mensual y por cuántos años (entre 5 y 20 años) para hacer la simulación del crédito. ¡Estoy listo para ayudarte!`,
    `Por supuesto, {UserName}. Dame el monto de la cuota que piensas pagar y el plazo del crédito (entre 5 y 20 años) y te mostraré una simulación con toda la información que necesitas.`,
    `Entendido, {UserName}. Cuéntame, ¿cuánto es la cuota que tienes en mente y por cuántos años deseas financiar el crédito? Así te muestro cómo quedarían las condiciones.`,
    `Muy bien, {UserName}. Para simular un crédito basado en el valor de la cuota, necesito que me indiques cuánto te gustaría pagar mensualmente y en cuántos años (entre 5 y 20) deseas financiarlo. Con esos datos, te preparo la simulación, amigo.`,
  ];
}

export function generateQuestionAboutProjectMessages() {
  return [
    `¡Claro que sí, {UserName}! Este proyecto nos encanta porque [información del proyecto]. ¿Qué más te gustaría saber? ¿O prefieres ponerte en contacto con uno de nuestros asesores?`,
    `{UserName}, este proyecto nos encanta porque combina una ubicación estratégica, diseño innovador y características que se adaptan a lo que buscas. Es ideal para una gran inversión. ¿Qué opinas, te animas a ponerte en contacto con uno de nuestros asesores?`,
    `{UserName}, este es uno de nuestros proyectos favoritos. Su ubicación privilegiada y sus características lo hacen ideal. Estoy aquí para contarte todos los detalles que necesites. ¿Qué más quieres saber de este u otros proyectos? ¿O prefieres ponerte en contacto con uno de nuestros asesores?`,
    `{UserName}, este proyecto combina un diseño excelente con una ubicación privilegiada. Si deseas más detalles o prefieres hablar directamente con un asesor, solo dímelo.`,
    `Por supuesto, {UserName}. Este proyecto ha llamado la atención por su propuesta integral y su potencial de inversión. ¿Te gustaría que te cuente más o prefieres ponerte en contacto con uno de nuestros asesores para conversar en detalle?`,
  ];
}

export function generateScheduleAnAppointmentMessages() {
  return [
    `¡Claro que sí, {UserName}! Para coordinar y comunicarte con uno de nuestros asesores, por favor indícame el nombre del proyecto de tu interés.`,
    `Por supuesto, {UserName}. Solo necesito que me digas el nombre del proyecto que te interesa para que puedas ponerte en contacto con uno de nuestros asesores.`,
    `Con mucho gusto, {UserName}. Indícame el proyecto del que quieres información y un asesor se pondrá en contacto contigo.`,
  ];
}
