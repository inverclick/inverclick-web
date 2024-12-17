import { ShareProject } from "@/components/shared/share-project/share-project";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@inverclick/inverclick-ui/dialog";
import { cn } from "@/lib/utils";
import { getAssetUrl } from "@/services/utils";
import { ChevronLeft, Grip, Heart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { SaveFavorite } from "@/components/shared/save-favorite/save-favorite";
import Image from "next/image";
import Masonry from "react-responsive-masonry";

type MasonryViewProps = {
  photoScrollTo: string;
  photos: string[];
  open: boolean;
  setOpen: (open: boolean) => void;
  disableSharableInteractions?: boolean;
};

export const MasonryView = ({
  photoScrollTo,
  photos,
  open,
  setOpen,
  disableSharableInteractions = false,
}: MasonryViewProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center justify-center gap-1">
          <Grip className="text-gray-600 h-5 w-5" />
          Mostrar más fotos
        </div>
      </DialogTrigger>
      <DialogContent
        isFullscreen
        hideCloseButton
        hasPadding={false}
        className="flex flex-col"
      >
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 p-6 h-max bg-white">
          <ChevronLeft
            onClick={() => setOpen(false)}
            className="cursor-pointer text-black"
          />
          <div
            className={cn("flex gap-3", {
              "pointer-events-none": disableSharableInteractions,
            })}
          >
            <ShareProject
              isIconOnly
              isDisabled={disableSharableInteractions}
              className="lg:hidden"
            />
            <ShareProject
              isDisabled={disableSharableInteractions}
              className="hidden lg:flex"
            />
            <SaveFavorite isIconOnly className="lg:hidden" />
            <SaveFavorite className="hidden lg:flex" />
          </div>
        </DialogHeader>
        <div className="p-6 overflow-y-auto">
          <PhotosGrid
            photoScrollTo={photoScrollTo}
            photos={photos}
            disableSharableInteractions={disableSharableInteractions}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

type PhotosGridProps = Readonly<{
  photoScrollTo: string;
  photos: string[];
  disableSharableInteractions?: boolean;
}>;

function PhotosGrid({
  photoScrollTo,
  photos,
  disableSharableInteractions = false,
}: PhotosGridProps) {
  const [photosSliderOpen, setPhotosSliderOpen] = useState(false);
  const [initialPhotoIndex, setInitialPhotoIndex] = useState(0);

  useEffect(() => {
    const photo = document.getElementById(photoScrollTo);

    if (!photo) return;

    photo.scrollIntoView({ behavior: "smooth" });
  }, [photoScrollTo]);

  return (
    <>
      <Masonry columnsCount={2} gutter="12px" className="max-w-3xl mx-auto">
        {photos.map((photo, index) => (
          <Image
            key={photo}
            id={photo}
            src={getAssetUrl(photo)}
            alt={photo}
            width="600"
            height="400"
            className="cursor-pointer object-cover !h-full w-auto hover:brightness-[0.8]"
            onClick={() => {
              setPhotosSliderOpen(true);
              setInitialPhotoIndex(index);
            }}
            unoptimized
          />
        ))}
      </Masonry>
      <PhotosSlider
        initialPhotoIndex={initialPhotoIndex}
        photos={photos}
        isOpen={photosSliderOpen}
        setIsOpen={setPhotosSliderOpen}
        disableSharableInteractions={disableSharableInteractions}
      />
    </>
  );
}

type PhotosSliderProps = Readonly<{
  initialPhotoIndex: number;
  photos: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  disableSharableInteractions?: boolean;
}>;

function PhotosSlider({
  initialPhotoIndex,
  photos,
  isOpen,
  setIsOpen,
  disableSharableInteractions = false,
}: PhotosSliderProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const matchesDesktop = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, photos]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        isFullscreen
        hideCloseButton
        hasPadding={false}
        className="grid grid-rows-[auto,minmax(0,1fr)] bg-black"
      >
        <DialogHeader className="grid grid-cols-3 items-center space-y-0 p-6 bg-black">
          <X
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-white"
          />
          <p className="text-start md:text-center text-white">
            {current}/{count}
          </p>
          <div
            className={cn("flex gap-3 text-white justify-end", {
              "pointer-events-none": disableSharableInteractions,
            })}
          >
            <ShareProject
              isIconOnly
              properties={{ triggerButton: { variant: "black" } }}
              className="lg:hidden"
            />
            <ShareProject
              properties={{ triggerButton: { variant: "black" } }}
              className="hidden lg:flex"
            />
            <SaveFavorite isIconOnly variant="black" className="lg:hidden" />
            <SaveFavorite variant="black" className="hidden lg:flex" />
          </div>
        </DialogHeader>
        <div>
          <Carousel
            setApi={setApi}
            opts={{
              startIndex: initialPhotoIndex,
            }}
            className="h-full [&>div.overflow-hidden]:h-full"
          >
            <CarouselContent className="h-full">
              {photos.map((photo) => {
                return (
                  <CarouselItem key={photo} className="h-full">
                    <Image
                      unoptimized
                      src={getAssetUrl(photo)}
                      alt={photo}
                      width="800"
                      height="600"
                      className="object-contain w-full h-full py-8 mx-auto"
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {matchesDesktop && (
              <>
                <CarouselPrevious className="bg-transparent text-white translate-x-24" />
                <CarouselNext className="bg-transparent text-white -translate-x-24" />
              </>
            )}
          </Carousel>
        </div>
      </DialogContent>
    </Dialog>
  );
}
