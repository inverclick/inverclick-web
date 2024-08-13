import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DialogHeader } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getAssetUrl } from "@/services/utils";
import { ChevronLeft, Grip, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import Masonry from "react-responsive-masonry";
import { useMediaQuery } from "usehooks-ts";
import { ShareProject } from "./ShareProject";

type MasonryViewProps = {
  photoScrollTo: string;
  photos: string[];
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const MasonryView = ({
  photoScrollTo,
  photos,
  open,
  setOpen,
}: MasonryViewProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <div className="flex items-center justify-center gap-1">
          <Grip className="text-gray-600 h-5 w-5" />
          Mostrar más fotos
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="fixed left-1/2 max-w-full !max-h-full h-full !rounded-none p-0 overflow-y-auto">
        <DialogHeader className="sticky top-0 z-10 flex flex-row items-center justify-between p-6 bg-white">
          <ChevronLeft
            onClick={() => setOpen(false)}
            className="cursor-pointer text-black"
          />
          <ShareProject />
        </DialogHeader>
        <div className="p-6">
          <PhotosGrid photoScrollTo={photoScrollTo} photos={photos} />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

type PhotosGridProps = Readonly<{
  photoScrollTo: string;
  photos: string[];
}>;

function PhotosGrid({ photoScrollTo, photos }: PhotosGridProps) {
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
      />
    </>
  );
}

type PhotosSliderProps = Readonly<{
  initialPhotoIndex: number;
  photos: string[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}>;

function PhotosSlider({
  initialPhotoIndex,
  photos,
  isOpen,
  setIsOpen,
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
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="fixed left-1/2 max-w-full !max-h-full h-full !border-none !rounded-none p-0 bg-black">
        <DialogHeader className="sticky top-0 grid grid-cols-3 items-center p-6 bg-black">
          <X
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-white"
          />
          <p className="!mt-0 text-center text-white">
            {current}/{count}
          </p>
        </DialogHeader>
        <div
          className={cn("flex justify-center items-center h-full", {
            "px-0": !matchesDesktop,
            "px-24": matchesDesktop,
          })}
        >
          <Carousel
            setApi={setApi}
            opts={{
              startIndex: initialPhotoIndex,
            }}
          >
            <CarouselContent>
              {photos.map((photo) => {
                return (
                  <CarouselItem key={photo}>
                    <Image
                      unoptimized
                      src={getAssetUrl(photo)}
                      alt={photo}
                      width="800"
                      height="600"
                      className="object-contain mx-auto my-auto h-full w-auto"
                    />
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            {matchesDesktop && (
              <>
                <CarouselPrevious className="bg-transparent text-white" />
                <CarouselNext className="bg-transparent text-white" />
              </>
            )}
          </Carousel>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
