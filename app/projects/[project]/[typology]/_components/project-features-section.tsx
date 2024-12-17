import { Project } from "@/app/projects/[project]/[typology]/_services/get-project";
import { cn } from "@/lib/utils";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Check } from "lucide-react";
import { ComponentProps } from "react";

export type ProjectFeaturesSectionProps = Readonly<{
  project: Project;
}> &
  ComponentProps<"section">;

export const ProjectFeaturesSection = ({
  project,
  ...props
}: ProjectFeaturesSectionProps) => {
  return (
    <section className={cn(props.className)}>
      <Typography variant="h3" className="mb-4">
        ¿Qué es lo que hace único a este proyecto?
      </Typography>
      <div className="bg-primary-100 p-4 lg:p-8 rounded-lg">
        <ul className="flex flex-col gap-4">
          {project.features.map((feature) => {
            return (
              <li key={feature} className="flex gap-2 items-start">
                <Icon
                  icon={Check}
                  className="flex-shrink-0 size-6 text-green-500"
                />
                {feature}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
