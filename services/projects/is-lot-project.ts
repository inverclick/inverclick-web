import { HOUSING_TYPE } from "@/constants/enums";
import { HousingTypeEnum } from "@/types/domain/enums";

/**
 * Un lote no tiene habitaciones, baños ni unidades (apartamentos), así que esos
 * datos no se muestran ni en la tarjeta ni en la ficha completa del proyecto.
 * `housing_type` es nullable en `draft_projects` (preview), de ahí el `null`.
 */
export function isLotProject(housingType: HousingTypeEnum | null) {
  return housingType === HOUSING_TYPE.LOTE;
}
