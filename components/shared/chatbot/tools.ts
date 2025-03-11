export const tools = [
  {
    name: "goToProjects",
    description:
      "Llama a esta función cuando el cliente exprese interés en conocer los inmuebles o proyectos disponibles.",
    strict: false,
    parameters: {
      type: "object",
      required: ["action", "response_message"],
      properties: {
        action: {
          type: "string",
          enum: ["go_to_projects"],
          description:
            "Acción que indica que el usuario desea ver los proyectos.",
        },
        response_message: {
          type: "string",
          description: "Mensaje de respuesta que se mostrará al usuario",
        },
      },
    },
  },
  {
    name: "goToProjectsWithFilters",
    description:
      "Llama a esta función para buscar proyectos inmobiliarios con filtros como ubicación, rango de precios, estado del inmueble y tipo de inmueble.",
    strict: false,
    parameters: {
      type: "object",
      properties: {
        filter: {
          type: "string",
          description:
            "Filtros estructurados en formato 'clave=valor,clave=valor'. Claves disponibles: 'department' (departamento), 'city' (ciudad), 'min_price' (precio mínimo), 'max_price' (precio máximo), 'housing_state' (NEW, USED, OFF_PLAN) y 'type' (APARTAMENTO, CASA, BODEGA, LOTE). Para múltiples tipos, usa guiones: 'type=APARTAMENTO-CASA-LOTE'. Ejemplo: 'city=Medellín,housing_state=NEW,min_price=100000000,max_price=300000000,type=CASA-LOTE'.",
        },
        response_message: {
          type: "string",
          description: "Mensaje de respuesta que se mostrará al usuario",
        },
      },
      required: ["filter", "response_message"],
      additionalProperties: false,
    },
  },
  {
    name: "goToProject",
    description:
      "Llama a esta función cuando el usuario solicite ver un proyecto específico o mencione el nombre de un proyecto.",
    strict: false,
    parameters: {
      type: "object",
      properties: {
        projectName: {
          type: "string",
          description: "El nombre del proyecto que se desea buscar",
        },
        action: {
          type: "string",
          enum: ["go_to_project"],
          description:
            "Acción que indica que el usuario desea ver un proyecto específico.",
        },
        response_message: {
          type: "string",
          description: "Mensaje de respuesta que se mostrará al usuario",
        },
      },
      required: ["projectName", "action", "response_message"],
    },
  },
  {
    name: "questionAboutProject",
    description:
      "Llama a esta función siempre que el cliente solicite información o pregunte sobre las características del inmueble. Esto incluye preguntas como: '¿Cuanto vale este proyecto?', '¿Cuántos cuartos tiene esta casa?', '¿Dónde está ubicado el apartamento?', '¿Tiene parqueadero?', '¿Hay piscinas?' ¿que me puedes decir de este proyecto? o cualquier consulta relacionada con un proyecto específico. El mensaje system proporcionará el nombre del proyecto y su ID.",
    strict: false,
    parameters: {
      type: "object",
      properties: {
        projectId: {
          type: "string",
          description:
            "El ID del proyecto en el que el usuario se encuentra. Este ID se obtiene del mensaje system que proporciona el nombre y el ID del proyecto.",
        },
      },
      required: ["projectId"],
    },
  },
  {
    name: "questionAboutInverclick",
    description:
      "Llama a esta función cuando el usuario solicite información sobre Inverclick, incluyendo temas como la aplicación móvil, opciones de financiación, créditos, políticas de privacidad, tratamiento de datos, términos y condiciones. Ejemplos de preguntas: '¿Qué formas de financiación ofrecen?', '¿Tienen aplicación móvil?', '¿Cómo manejan los datos personales?', '¿Cuáles son los términos y condiciones?', o cualquier consulta relacionada con los servicios y políticas de Inverclick.",
    strict: false,
    parameters: {
      type: "object",
      properties: {
        question: {
          type: "string",
          description:
            "El tema de la pregunta que realiza el usuario. Ejemplos: 'Financiación', 'Aplicación móvil', 'Política de privacidad', 'Términos y condiciones'.",
        },
      },
      required: ["question"],
    },
  },
  {
    name: "scheduleAnAppointment",
    description:
      "Llama a esta función cuando el usuario quiera agendar una cita, reunión o videollamada para ver un proyecto o inmueble. Nunca asumas la fecha ni la hora al agendar; siempre debes solicitar esta información al cliente. El cliente siempre debe proporcionar un proyecto para poder agendar la cita, sin el nombre del prpyecto no se puede agendar la cita",
    strict: false,
    parameters: {
      type: "object",
      properties: {
        action: {
          type: "string",
          enum: ["schedule_an_appointment"],
          description:
            "Acción que indica que el cliente quiere agendar una cita. Siempre debe ser 'schedule_an_appointment'.",
        },
        projectName: {
          type: "string",
          description:
            "El nombre del proyecto. Este campo debe ser solicitado al cliente si no lo proporciona.",
        },
        date: {
          type: "string",
          description:
            "La fecha en la que el cliente desea agendar la cita. Debe estar en el formato YYYY-MM-DD. Ejemplo: '2024-12-19'. Este campo debe ser solicitado al cliente si no lo proporciona.",
        },
        time: {
          type: "string",
          description:
            "La hora en la que el cliente desea agendar la cita. Debe estar en el formato HH:MM (24 horas). Ejemplo: '14:30'. Este campo debe ser solicitado al cliente si no lo proporciona.",
        },
        response_message: {
          type: "string",
          description: "Mensaje de respuesta que se mostrará al usuario",
        },
      },
      required: ["action", "projectName", "date", "time", "response_message"],
    },
  },
  {
    name: "simulateCredit",
    description:
      "Llama a esta función cuando el cliente quiera simular un crédito, deberás preguntarle que simulación desea realizar si por 'Valor de la vivienda' o por 'valor de la cuota a pagar'. El usuario tiene que decir el valor de la vivienda o el valor de la cuota a pagar, el porcentaje de financiación (no puede superar el 70%) y los años a solicitar el crédito (plazo del crédito) por ejemplo: 'quiero simular un crédito' 'puedo simular un crédito?' y le debes solicitar los datos.",
    strict: false,
    parameters: {
      type: "object",
      properties: {
        simulationType: {
          type: "string",
          description:
            "El tipo de simulación que se desea realizar, los valores son: Valor de la vivienda : 'valueHousing' o Valor de cuota : 'quotaValue. El valor por defecto si el usuario no especifica el type es 'none'",
        },
        quotaValue: {
          type: "number",
          description: "El valor de la cuota a pagar.",
        },
        housingValue: {
          type: "number",
          description: "El valor de la vivienda.",
        },
        percentageFunding: {
          type: "number",
          description:
            "El porcentaje de financiación, expresado como un decimal (máximo 0.7 para 70%). Este valor no es necesario para 'quotaValue'. No es necesario solicitarlo al usuario cuando simula por el valor de la cuota a pagar",
        },
        yearsFunding: {
          type: "number",
          description:
            "Los años del crédito de financiación (plazo del crédito) debe ser mínimo 5 años y máximo 20 años.",
        },
        response_message: {
          type: "string",
          description: "Mensaje de respuesta que se mostrará al usuario",
        },
      },
      additionalProperties: false,
      required: ["simulationType"],
    },
  },
];
