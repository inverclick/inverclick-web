"use client";

import { MasonryView } from "@/components/projects/review/masonry-view";
import { getAssetUrl } from "@/services/utils";
import { BadgeCheck } from "lucide-react";
import { useState } from "react";

import Image from "next/image";

export type ProjectGalleryProps = {
  photos: string[];
};

export const ProjectGallery = ({ photos }: ProjectGalleryProps) => {
  const [open, setOpen] = useState(false);

  const [photoScrollTo, setPhotoScrollTo] = useState<string>("");

  const mainPhoto = photos[0];
  const restPhotos = [...photos].slice(1, 5);

  return (
    <div className="relative flex flex-col gap-3 md:h-[312px] md:flex-row lg:h-[412px] 2xl:h-[612px]">
      <Image
        unoptimized
        src={getAssetUrl(mainPhoto)}
        alt=""
        width="600"
        height="400"
        onClick={() => {
          setOpen(true);
          setPhotoScrollTo(mainPhoto);
        }}
        className="h-auto w-full flex-1 cursor-pointer object-cover hover:brightness-[0.8] md:w-[312px] md:rounded-l-3xl lg:h-[412px] 2xl:h-[612px]"
      />
      <div
        className={`pswp-gallery grid grid-cols-${
          restPhotos.length === 1 ? 1 : 2
        } gap-3`}
        id="gallery--individual"
      >
        {restPhotos.map((photo, index) => (
          <Image
            key={index}
            unoptimized
            src={getAssetUrl(photo)}
            alt={photo}
            width="600"
            height="200"
            onClick={() => {
              setOpen(true);
              setPhotoScrollTo(photo);
            }}
            className={`cursor-pointer object-cover hover:brightness-[0.8] md:h-[150px] md:w-[200px] lg:h-[200px] lg:w-[300px] 2xl:h-[300px] 2xl:w-[400px] ${
              index === 1 ? "md:rounded-tr-3xl" : ""
            } ${index === 3 ? "md:rounded-br-3xl" : ""}`}
          />
        ))}
      </div>

      <span className="absolute left-1 top-1 flex items-center justify-center gap-2 rounded-xl border border-black bg-gray-300/80 px-2 py-1 text-xs md:left-4 md:top-3 md:px-3 md:py-2">
        <BadgeCheck className="h-5 w-5 text-green-600" />
        Proyecto verificado
      </span>

      <span className="absolute bottom-1 right-1 flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-black bg-gray-300/80 px-2 py-1 text-xs md:bottom-3 md:right-4 md:px-3 md:py-2">
        <MasonryView
          open={open}
          setOpen={setOpen}
          photoScrollTo={photoScrollTo}
          photos={photos}
        />
      </span>
    </div>
  );
};
