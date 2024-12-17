import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { CreditSimulador } from "@/components/financing/CreditSimulador";
import { cn } from "@/lib/utils";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { ComponentProps } from "react";

export type ProjectCreditSimulatorSectionProps = Readonly<{
  typology: Project["typologies"][0];
}> &
  ComponentProps<"section">;

export const ProjectCreditSimulatorSection = ({
  typology,
  ...props
}: ProjectCreditSimulatorSectionProps) => {
  return (
    <section className={cn(props.className)} {...props}>
      <Typography variant="h3" className="mb-4">
        Simulador de crédito
      </Typography>
      <CreditSimulador price={typology.price} />
    </section>
  );
};
