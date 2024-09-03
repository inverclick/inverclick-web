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
import { getAssetUrl } from "@/services/utils";
import { ChevronLeft, Grip, Heart, X } from "lucide-react";
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
      <AlertDialogContent className=" max-w-screen h-screen min-h-screen max-h-screen p-0 border-none !rounded-none overflow-y-auto">
        <DialogHeader className="sticky top-0 z-10 flex flex-row items-center justify-between space-y-0 p-6 bg-white">
          <ChevronLeft
            onClick={() => setOpen(false)}
            className="cursor-pointer text-black"
          />
          <div className="flex gap-3">
            <ShareProject />
            <span className="flex items-center gap-2 text-sm md:text-base underline hover:text-primary-600 transition-colors ease-in cursor-pointer">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
              Guardar
            </span>
          </div>
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
      <AlertDialogContent className="grid grid-rows-[auto,minmax(0,1fr)] max-w-screen h-screen min-h-screen max-h-screen p-0 border-none !rounded-none bg-black">
        <DialogHeader className="sticky top-0 grid grid-cols-3 items-center space-y-0 p-6 bg-black">
          <X
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-white"
          />
          <p className="text-start md:text-center text-white">
            {current}/{count}
          </p>
          <div className="flex gap-3 text-white justify-end">
            <ShareProject />
            <span className="flex items-center gap-2 text-sm md:text-base underline hover:text-primary-600 transition-colors ease-in cursor-pointer">
              <Heart className="w-4 h-4 md:w-5 md:h-5" />
              Guardar
            </span>
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
                  <CarouselItem key={photo}>
                    <Image
                      unoptimized
                      src={getAssetUrl(photo)}
                      alt={photo}
                      width="800"
                      height="600"
                      className="object-contain w-4/5 h-full mx-auto"
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
      </AlertDialogContent>
    </AlertDialog>
  );
}
