const DATE_FORMATTER = new Intl.DateTimeFormat("es-CO", {
  day: "numeric",
  month: "long",
  year: "numeric",
  // Las fechas del frontmatter son días calendario (AAAA-MM-DD): se formatean
  // en UTC para que la zona horaria del servidor no las corra un día.
  timeZone: "UTC",
});

/** "2026-09-19" → "19 de septiembre de 2026" */
export const formatPostDate = (isoDate: string) =>
  DATE_FORMATTER.format(new Date(`${isoDate}T00:00:00Z`));

export const formatReadingTime = (minutes: number) =>
  `${minutes} min de lectura`;
