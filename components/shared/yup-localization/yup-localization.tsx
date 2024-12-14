"use client";

import { PropsWithChildren, useEffect } from "react";
import { setLocale } from "yup";

export type YupLocalizationProps = PropsWithChildren;

export const YupLocalization = ({ children }: YupLocalizationProps) => {
  useEffect(() => {
    setLocale({
      mixed: {
        default: "El campo es invalido",
        required: "El campo es requerido",
        defined: "El campo debe ser definido",
        notNull: "El campo no puede ser nulo",
        oneOf: ({ values }) =>
          `El campo debe ser uno de los siguientes valores: ${values}`,
        notOneOf: ({ values }) =>
          `El campo no debe ser uno de los siguientes valores: ${values}`,
      },
      string: {
        length: ({ length }) =>
          `El campo debe tener exactamente ${length} caracteres`,
        min: ({ min }) => `El campo debe tener al menos ${min} caracteres`,
        max: ({ max }) => `El campo debe tener como máximo ${max} caracteres`,
        matches: ({ regex }) =>
          `El cambo debe coincidir con lo siguiente: '${regex}'`,
        email: "El campo debe ser un correo electrónico válido",
        url: "El campo debe ser una URL válida",
        uuid: "El campo debe ser un UUID válido",
        datetime: "El campo debe ser una fecha-hora ISO válida",
        datetime_precision: ({ precision }) =>
          `El campo debe ser una fecha-hora ISO válida con una precisión por debajo del segundo de exactamente ${precision} dígitos`,
        datetime_offset: `El campo debe ser una fecha-hora ISO válida con zona horaria UTC 'Z'`,
        trim: "El campo debe ser una cadena recortada",
        lowercase: "El campo debe ser una cadena en minúsculas",
        uppercase: "El campo debe ser una cadena en mayúsculas",
      },
      number: {
        min: ({ min }) => `El campo debe ser mayor o igual que ${min}`,
        max: ({ max }) => `El campo debe ser menor o igual que ${max}`,
        lessThan: ({ less }) => `El campo debe ser menor que ${less}`,
        moreThan: ({ more }) => `El campo debe ser mayor que ${more}`,
        positive: "El campo must be a positive number",
        negative: "El campo must be a negative number",
        integer: "debe ser un número entero",
      },
      date: {
        min: ({ min }) => `El campo debe ser posterior a ${min}`,

        max: ({ max }) => `El campo debe ser anterior a ${max}`,
      },
      boolean: {
        isValue: ({ value }) => `El campo debe ser ${value}`,
      },
      object: {
        noUnknown: ({ unknown }) =>
          `El campo tiene claves no especificadas: ${unknown}`,
      },
      array: {
        min: ({ min }) => `El campo debe tener al menos ${min} elementos`,
        max: ({ max }) =>
          `El campo debe tener menos o igual que ${max} elementos`,
        length: ({ length }) => `El campo debe tener ${length} elementos`,
      },
    });
  }, []);

  return <>{children}</>;
};
