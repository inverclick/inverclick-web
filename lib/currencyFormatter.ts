import type { Currency } from "@/contexts/CurrencyContext";

export function currencyFormatter(numero: number, moneda: Currency): string {
  if (moneda !== "COP" && moneda !== "USD" && moneda !== "EUR") {
    throw new Error("Moneda no válida. Debe ser COP, USD o EUR.");
  }

  if (isNaN(numero)) {
    numero = 0;
  }

  switch (moneda) {
    case "COP":
      return Number(numero).toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    case "USD":
      return Number(numero).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    case "EUR":
      return Number(numero).toLocaleString("es-ES", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
    default:
      return "";
  }
}

export function currencyParser(valor: string, moneda: Currency): number {
  if (moneda !== "COP" && moneda !== "USD" && moneda !== "EUR") {
    throw new Error("Moneda no válida. Debe ser COP, USD o EUR.");
  }

  switch (moneda) {
    case "COP":
      return parseFloat(valor.replace(/[$.]/g, "").replace(/,/g, "."));
    case "USD":
      return parseFloat(valor.replace(/[$,]/g, ""));
    case "EUR":
      return parseFloat(valor.replace(/[$.]/g, "").replace(/,/g, "."));
    default:
      return 0;
  }
}
