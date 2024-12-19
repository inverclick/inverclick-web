import { HousingType } from "@/types/housing-type";
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {housingTypes.map(({ icon, id, label }) => {
          return (
            <button
              key={id}
              onClick={() => onChange(label)}
              className={`flex flex-col gap-1 border border-black rounded-lg p-3 hover:bg-primary-800 hover:text-white hover:border-primary-800 transition-colors ease-in ${
                currentTypes.includes(label)
                  ? "bg-primary-600 text-white border-primary-600"
                  : ""
              }`}
            >
              <Icon iconName={icon as keyof typeof icons} />
              <span className="text-sm md:text-base font-medium">{label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
