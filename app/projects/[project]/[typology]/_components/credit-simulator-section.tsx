import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { CreditSimulador } from "@/components/financing/credit-simulator";
import { cn } from "@/lib/utils";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { ComponentProps } from "react";

export type CreditSimulatorSectionProps = Readonly<{
  typology: Project["typologies"][0];
}> &
  ComponentProps<"section">;
export const CreditSimulatorSection = ({
  typology,
  ...props
}: CreditSimulatorSectionProps) => {
  return (
    <section className={cn(props.className)} {...props}>
      <Typography variant="h2" className="mb-4">
        Simulador de crédito
      </Typography>
      <CreditSimulador price={typology.price} />
    </section>
  );
};
