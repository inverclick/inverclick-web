import { SelectCurrency } from "@/components/shared/select-currency/select-currency";
import { Slider } from "@/components/ui/price-slider";
import { useCurrencyContext } from "@/contexts/currency-context";
import { formatCurrency, parseCurrency } from "@/lib/format-currency";
import { Input } from "@inverclick/inverclick-ui/input";

export type PriceFilterProps = {
  priceGraphicData: { goal: number }[];
  maxPrice: number;
  minPrice: number;
  setMaxPrice: (value: number) => void;
  setMinPrice: (value: number) => void;
};

export const PriceFilter = ({
  priceGraphicData,
  maxPrice,
  minPrice,
  setMaxPrice,
  setMinPrice,
}: PriceFilterProps) => {
  const onChange = (name: string, value: string) => {
    const newValue = value.length ? Number(value) : undefined;

    if (name === "min_price") {
      setMinPrice(Math.min(maxPrice, Number(newValue)));
    } else {
      setMaxPrice(Math.min(minPrice, Number(newValue)));
    }
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="flex gap-2 items-center">
        <h4 className="font-medium md:text-lg">Rango de precios</h4>
        <SelectCurrency />
      </div>
      <div className="flex flex-col gap-6 justify-center items-center">
        <div className="self-center w-3/4">
          <Slider
            data={priceGraphicData}
            value={[Number(minPrice), Number(maxPrice)]}
            min={0}
            max={999999999}
            step={1}
            onValueChange={(values) => {
              setMinPrice(values[0]);
              setMaxPrice(values[1]);
            }}
          />
        </div>
        <div className="flex gap-2 justify-center items-center w-3/4">
          <CustomInput
            label="Mínimo"
            value={minPrice}
            name="min_price"
            onChange={onChange}
          />
          <span>-</span>
          <CustomInput
            label="Máximo"
            value={maxPrice}
            name="max_price"
            onChange={onChange}
          />
        </div>
      </div>
    </section>
  );
};

const CustomInput = ({
  value,
  onChange,
  name,
  label,
}: {
  label: string;
  value: number | undefined;
  onChange: (name: string, value: string) => void;
  name: string;
}) => {
  const { currency, convert } = useCurrencyContext((s) => s);

  const onChangeCurrency = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = parseCurrency(value, currency);
    onChange(name, parsedValue.toString());
  };

  return (
    <div className="flex-1 relative h-14 rounded-lg text-base border border-zinc-800">
      <p className="absolute text-[10px] md:text-xs top-1 left-3">{label}</p>
      <Input
        value={formatCurrency(convert(Number(value)), currency)}
        className="mt-3 text-sm md:text-base border-0 bg-white focus-visible:ring-0 focus-visible:ring-offset-0"
        name={name}
        onChange={onChangeCurrency}
      />
    </div>
  );
};
