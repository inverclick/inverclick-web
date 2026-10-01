/**
 * Reserva el alto del mapa de ubicación mientras se carga, para que la página
 * no salte cuando aparece. Va en un archivo aparte para no arrastrar el código
 * de Google Maps al importarlo.
 */
export function ProjectLocationMapPlaceholder() {
  return <div className="h-[400px] w-full rounded-lg bg-muted" />;
}
