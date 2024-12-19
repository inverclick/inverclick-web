import type { Currency } from "@/contexts/currency-context";

export function formatCurrency(value: number, currency: Currency): string {
  if (currency !== "COP" && currency !== "USD" && currency !== "EUR") {
    throw new Error("Currency not valid. Must be COP, USD or EUR.");
  }

  if (isNaN(value)) {
    value = 0;
  }

  switch (currency) {
    case "COP":
      return Number(value).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    case "USD":
      return Number(value).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    case "EUR":
      return Number(value).toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    default:
      return "";
  }
}

export function parseCurrency(value: string, moneda: Currency): number {
  if (moneda !== "COP" && moneda !== "USD" && moneda !== "EUR") {
    throw new Error("Currency not valid. Must be COP, USD or EUR.");
  }

  switch (moneda) {
    case "COP":
      return parseFloat(value.replace(/[$.]/g, "").replace(/,/g, "."));
    case "USD":
      return parseFloat(value.replace(/[$,]/g, ""));
    case "EUR":
      return parseFloat(value.replace(/[$.]/g, "").replace(/,/g, "."));
    default:
      return 0;
  }
}
