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
      <div className="flex justify-between gap-4">
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
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
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
      <div className="flex flex-col justify-between gap-4 px-0 xl:flex-row xl:px-6">
        <span className="flex justify-center gap-2">
          <Icon icon={MapPin} className="hidden size-6 text-primary xl:flex" />
          <Typography className="text-center xl:text-left">
            {department}, {city} / {address}
          </Typography>
        </span>
        <div className="flex items-center justify-center gap-2">
          <Typography>Desde:</Typography>
          <DisplayFormattedCurrency number={price} showAsterix />
        </div>
      </div>
    </section>
  );
};
