import { OtherProjects } from "@/app/projects/[project]/[typology]/_components/other-projects";
import { getOtherProjects } from "@/app/projects/[project]/[typology]/_services/get-other-projects";
import { ProjectCardSkeleton } from "@/components/shared/project-card";
import { Typography } from "@inverclick/inverclick-ui/typography";

export type OtherProjectsSectionProps = Readonly<{
  projectId: string;
}>;

/**
 * Se consulta aparte del proyecto principal y se renderiza dentro de un
 * `Suspense`: así la respuesta no espera a esta query y la sección llega por
 * streaming cuando está lista.
 */
export async function OtherProjectsSection({
  projectId,
}: OtherProjectsSectionProps) {
  const { data: projects } = await getOtherProjects({ projectId });

  if (!projects || projects.length === 0) return null;

  return <OtherProjects projects={projects} />;
}

export function OtherProjectsSectionSkeleton() {
  return (
    <section>
      <Typography variant="h3" className="mb-4">
        Otros proyectos que podrían interesarte
      </Typography>
      <div className="flex gap-4 overflow-hidden px-1 pb-2 xl:px-8">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="shrink-0">
            <ProjectCardSkeleton />
          </div>
        ))}
      </div>
    </section>
  );
}
