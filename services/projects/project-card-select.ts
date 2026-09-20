/** Campos compartidos por las tarjetas y el mapa de proyectos. */
export const PROJECT_CARD_SELECT = `
  id, name, photos, address, latitude, longitude, housing_type, housing_state,
  typologies!inner(id, price, area, rooms, bathrooms),
  department:departments(name),
  city:cities(name),
  company:companies(logo_url)
`;
