import { EmptyAPIResponse } from "@/types/api";
import { FunctionsHttpError } from "@supabase/supabase-js";

// https://github.com/supabase/functions-js/issues/55#issuecomment-2068191085
export async function getContextFromSupabaseFunctionError(error: unknown) {
  if (error instanceof FunctionsHttpError) {
    const context = (await error.context.json()) as EmptyAPIResponse;
    return context;
  }

  throw new Error("Error is not a FunctionsHttpError");
}
