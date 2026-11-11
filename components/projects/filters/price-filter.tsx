import { SelectCurrency } from "@/components/shared/select-currency/select-currency";
import dynamic from "next/dynamic";
import { useCurrencyContext } from "@/contexts/currency-context";
import { formatCurrency, parseCurrency } from "@/lib/format-currency";
import { Input } from "@inverclick/inverclick-ui/input";

// The price histogram uses recharts (+ d3), which only matter once the filters
// dialog is open: load them then instead of with the page.
const Slider = dynamic(
  () => import("@/components/ui/price-slider").then((m) => m.Slider),
  {
    ssr: false,
    loading: () => (
      <div className="h-[72px] w-full animate-pulse rounded bg-primary-50" />
    ),
  }
);

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
      <div className="flex items-center gap-2">
        <h4 className="font-medium md:text-lg">Rango de precios</h4>
        <SelectCurrency />
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="w-3/4 self-center">
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
        <div className="flex w-3/4 items-center justify-center gap-2">
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
    <div className="relative h-14 flex-1 rounded-lg border border-zinc-800 text-base">
      <p className="absolute left-3 top-1 text-[10px] md:text-xs">{label}</p>
      <Input
        value={formatCurrency(convert(Number(value)), currency)}
        className="mt-3 border-0 bg-white text-sm focus-visible:ring-0 focus-visible:ring-offset-0 md:text-base"
        name={name}
        onChange={onChangeCurrency}
      />
    </div>
  );
};
