import { createClient } from "@/services/supabase/browser-client";

export type RequestProjectInfoParams = {
  projectId: string;
  fullName: string;
  email: string;
  phone: string;
};

export type RequestProjectInfoResult =
  | { status: "created" }
  /** El cliente ya había pedido información sobre este proyecto. */
  | { status: "already-requested" }
  | { status: "error"; message: string };

const FUNCTION_NAME = "request-project-info";

const GENERIC_ERROR = "No pudimos enviar tu solicitud. Inténtalo de nuevo";

/**
 * Registra la solicitud de información de un cliente sobre un proyecto.
 *
 * Toda la lógica (identidad del cliente, estado inicial y la regla de una sola
 * solicitud por proyecto) vive en la edge function `request-project-info`, que
 * es la misma API que consumirá la app móvil. Aquí solo se traduce la respuesta
 * a algo que la UI pueda pintar.
 */
export async function requestProjectInfo(
  params: RequestProjectInfoParams
): Promise<RequestProjectInfoResult> {
  const supabase = createClient();

  const { data, error } = await supabase.functions.invoke(FUNCTION_NAME, {
    body: params,
  });

  if (error) {
    const payload = await readErrorPayload(error);

    if (payload?.code === "ALREADY_REQUESTED") {
      return { status: "already-requested" };
    }

    return { status: "error", message: payload?.message || GENERIC_ERROR };
  }

  // Por si la función responde 200 con un fallo de negocio en el cuerpo.
  if (data && data.success === false) {
    if (data.code === "ALREADY_REQUESTED") {
      return { status: "already-requested" };
    }

    return { status: "error", message: data.message || GENERIC_ERROR };
  }

  return { status: "created" };
}

type FunctionErrorPayload = {
  code?: string;
  message?: string;
};

/**
 * `functions.invoke` considera error cualquier respuesta que no sea 2xx y deja
 * la respuesta original en `error.context`. El cuerpo es donde viaja el `code`
 * que distingue "ya solicitado" de un fallo real.
 */
async function readErrorPayload(
  error: unknown
): Promise<FunctionErrorPayload | null> {
  const context = (error as { context?: unknown })?.context;

  if (!(context instanceof Response)) {
    return null;
  }

  try {
    return (await context.clone().json()) as FunctionErrorPayload;
  } catch {
    return null;
  }
}
