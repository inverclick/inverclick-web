import { HousingType } from "@/types/domain/housing-types";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { icons } from "lucide-react";

export type TypeFilterProps = {
  currentTypes: string[];
  setCurrentTypes: (value: string[]) => void;
  housingTypes: HousingType[];
};

export const TypeFilter = ({
  currentTypes,
  setCurrentTypes,
  housingTypes,
}: TypeFilterProps) => {
  const onChange = (type: string) => {
    const newTypes = (
      currentTypes.includes(type)
        ? currentTypes.filter((t) => t !== type)
        : [...currentTypes, type]
    ).filter((t) => t.length);
    setCurrentTypes(newTypes);
  };

  return (
    <section className="flex flex-col gap-3">
      <h4 className="font-medium md:text-lg">Tipo de propiedad</h4>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {housingTypes.map(({ icon, id, label }) => {
          return (
            <button
              key={id}
              onClick={() => onChange(label)}
              className={`flex items-center gap-1 rounded-lg border border-black p-3 transition-colors ease-in hover:border-primary-800 hover:bg-primary-800 hover:text-white ${
                currentTypes.includes(label)
                  ? "border-primary-600 bg-primary-600 text-white"
                  : ""
              }`}
            >
              <Icon iconName={icon as keyof typeof icons} />
              <span className="text-sm font-medium md:text-base">{label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
