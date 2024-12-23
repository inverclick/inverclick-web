import { DisplayTRM } from "@/components/projects/display-trm";
import { ProjectGallery } from "@/components/projects/review/project-gallery";
import { DisplayFormattedCurrency } from "@/components/shared/display-formatted-currency";
import { SaveFavorite } from "@/components/shared/save-favorite/save-favorite";
import { SelectCurrency } from "@/components/shared/select-currency/select-currency";
import { ShareProject } from "@/components/shared/share-project/share-project";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@inverclick/inverclick-ui/breadcrumb";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { MapPin } from "lucide-react";

import Link from "next/link";

export type ProjectHeroProps = {
  name: string;
  photos: string[];
  price: number;
  department: string;
  city: string;
  address: string;
  className?: string;
};

export const ProjectHero = ({
  name,
  department,
  city,
  address,
  price,
  photos,
  className,
}: ProjectHeroProps) => {
  return (
    <section className={cn("flex flex-col gap-4 md:gap-6 xl:gap-8", className)}>
      <div className="flex gap-4 justify-between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Inicio</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/projects">Proyectos</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <DisplayTRM size="base" className="hidden md:block" />
      </div>
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <Typography variant="h1">{name}</Typography>
        <div className="flex gap-4">
          <ShareProject isIconOnly className="lg:hidden" />
          <ShareProject className="hidden lg:flex" />
          <SaveFavorite isIconOnly className="lg:hidden" />
          <SaveFavorite className="hidden lg:flex" />
          <SelectCurrency className="min-w-20" />
        </div>
      </div>
      <ProjectGallery photos={photos} />
      <div className="flex flex-col xl:flex-row justify-between gap-4 px-0 xl:px-6">
        <span className="flex gap-2 justify-center">
          <Icon icon={MapPin} className="hidden xl:flex size-6 text-primary" />
          <Typography className="text-center xl:text-left">
            {department}, {city} / {address}
          </Typography>
        </span>
        <div className="flex justify-center items-center gap-2">
          <Typography>Desde:</Typography>
          <DisplayFormattedCurrency number={price} showAsterix />
        </div>
      </div>
    </section>
  );
};
