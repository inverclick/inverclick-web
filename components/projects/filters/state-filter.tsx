import { HOUSING_STATE } from "@/constants/enums";

const STATE_FILTER_OPTIONS = [
  { label: "Todos", value: "all" },
  { label: "Sobre planos", value: HOUSING_STATE.OFF_PLAN },
  { label: "Nuevos", value: HOUSING_STATE.NEW },
  { label: "Usados", value: HOUSING_STATE.USED },
];

export type StateFilterProps = {
  currentState: string;
  setCurrentState: (value: string) => void;
};

export const StateFilter = ({
  currentState,
  setCurrentState,
}: StateFilterProps) => {
  const onChange = (type: string) => {
    if (type === "all") return setCurrentState("all");
    setCurrentState(type);
  };

  return (
    <section className="flex flex-col gap-3">
      <h4 className="font-medium md:text-lg">Tipo de proyecto</h4>
      <div className="flex items-center justify-center">
        {STATE_FILTER_OPTIONS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onChange(value)}
            className={`flex h-14 flex-1 items-center justify-center border-x-[0.5px] border-y border-black p-3 transition-colors ease-in first:rounded-l-lg first:border-l last:rounded-r-lg last:border-r hover:border-primary-800 hover:bg-primary-800 hover:text-white ${
              currentState.includes(value)
                ? "border-primary-600 bg-primary-600 text-white"
                : ""
            }`}
          >
            <span className="text-xs font-medium md:text-base">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
