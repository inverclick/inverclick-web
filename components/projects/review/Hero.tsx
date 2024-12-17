import { DisplayTRM } from "@/components/projects/DisplayTRM";
import { SelectCurrency } from "@/components/projects/SelectCurrency";
import { ProjectGallery } from "@/components/projects/review/ProjectGallery";
import { ShareProject } from "@/components/projects/review/ShareProject";
import { DisplayFormattedCurrency } from "@/components/shared/DisplayFormattedCurrency";
import { cn } from "@/lib/utils";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { Heart, Home, MapPin } from "lucide-react";

import Link from "next/link";

export type HeroProps = {
  name: string;
  photos: string[];
  price: number;
  department: string;
  city: string;
  address: string;
  className?: string;
  disableSharableInteractions?: boolean;
};

export const Hero = ({
  name,
  department,
  city,
  address,
  price,
  photos,
  className,
  disableSharableInteractions = false,
}: HeroProps) => {
  return (
    <section className={cn("flex flex-col gap-4 md:gap-6 xl:gap-8", className)}>
      <div className="flex gap-4 justify-between">
        <div className="text-xs md:text-sm flex gap-2 mb-3 md:mb-4 xl:mb-5">
          <Link
            href="/"
            className="hover:text-primary-800 hover:underline transition-all ease-in flex gap-1"
          >
            <Home className="w-[14px] h-[14px] md:w-4 md:h-4" />
            Home
          </Link>
          <span>/</span>
          <Link
            href="/projects"
            className="hover:text-primary-800 hover:underline transition-all ease-in"
          >
            Proyectos
          </Link>
          <span>/</span>
          <span className="text-primary-600">{name}</span>
        </div>
        <DisplayTRM size="base" className="hidden md:block" />
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between gap-6 md:items-center">
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-semibold">
          {name}
        </h1>
        <div className={"flex gap-4 items-center"}>
          <ShareProject isDisabled={disableSharableInteractions} />
          <span
            className={cn(
              "flex items-center gap-2 text-sm md:text-base underline hover:text-primary-600 transition-colors ease-in cursor-pointer",
              {
                "pointer-events-none": disableSharableInteractions,
              }
            )}
          >
            <Icon icon={Heart} />
            Guardar
          </span>
          <SelectCurrency />
        </div>
      </div>
      <ProjectGallery
        photos={photos}
        disableSharableInteractions={disableSharableInteractions}
      />
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
