"use client";

import { getAssetUrl } from "@/services/utils";
import { BadgeCheck } from "lucide-react";
import { useState } from "react";
import { MasonryView } from "@/components/projects/review/MasonryView";

import Image from "next/image";

interface Props {
  photos: string[];
  disableSharableInteractions?: boolean;
}

export const ProjectGallery = ({
  photos,
  disableSharableInteractions = false,
}: Props) => {
  const [open, setOpen] = useState(false);

  const [photoScrollTo, setPhotoScrollTo] = useState<string>("");

  const mainPhoto = photos[0];
  const restPhotos = [...photos].slice(1, 5);

  return (
    <div className="relative flex flex-col md:flex-row gap-3 md:h-[312px] lg:h-[412px] 2xl:h-[612px]">
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
        className="cursor-pointer w-full h-auto md:rounded-l-3xl flex-1 md:w-[312px] lg:h-[412px] 2xl:h-[612px] object-cover hover:brightness-[0.8]"
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
            className={`cursor-pointer md:h-[150px] md:w-[200px] lg:h-[200px] lg:w-[300px] 2xl:h-[300px] 2xl:w-[400px] object-cover hover:brightness-[0.8] ${
              index === 1 ? "md:rounded-tr-3xl" : ""
            } ${index === 3 ? "md:rounded-br-3xl" : ""}`}
          />
        ))}
      </div>

      <span className="absolute flex justify-center items-center gap-2 top-1 left-1 md:top-3 md:left-4 bg-gray-300/80 px-2 py-1 md:px-3 md:py-2 text-xs rounded-xl border border-black">
        <BadgeCheck className="text-green-600 h-5 w-5" />
        Proyecto verificado
      </span>

      <span className="cursor-pointer absolute flex justify-center items-center gap-2 bottom-1 right-1 md:bottom-3 md:right-4 bg-gray-300/80 px-2 py-1 md:px-3 md:py-2 text-xs rounded-xl border border-black">
        <MasonryView
          open={open}
          setOpen={setOpen}
          photoScrollTo={photoScrollTo}
          photos={photos}
          disableSharableInteractions={disableSharableInteractions}
        />
      </span>
    </div>
  );
};
