import { CardService } from "@/components/shared/card-service";
import {
  AdvertisingCarousel,
  AdvertisingCarouselItem,
} from "@/components/shared/advertising-carousel/advertising-carousel";
import { MyFooter } from "@/components/shared/footer/MyFooter";
import { Header } from "@/components/shared/header/header";
import { DownloadAppModal } from "@/components/sign-in/download-app-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <div className="flex flex-col lg:h-screen">
        <Header />
        <div className="flex-grow lg:divided-background">
          <article className="grid grid-cols-1 lg:grid-cols-2 max-w-screen-2xl h-full mx-auto">
            <LeftSection />
            <RightSection />
          </article>
        </div>
      </div>
      <MyFooter />
    </main>
  );
}

function LeftSection() {
  return (
    <div className="relative flex justify-center items-center p-content lg:p-content-full">
      {/* <h2 className="text-center lg:text-left text-3xl lg:text-5xl font-bold">
        <p>¡Nos alegramos</p>
        <p>
          de volver a <span className="text-primary-500">VERTE!</span>
        </p>
      </h2> */}
      <AdvertisingCarousel>
        {Array.from({ length: 3 }).map((_, index) => (
          <AdvertisingCarouselItem key={index}>
            <p>lorem {index}</p>
          </AdvertisingCarouselItem>
        ))}
      </AdvertisingCarousel>
      <CardService
        title="Soy constructora"
        link="/"
        className="hidden lg:block absolute bottom-4 left-4"
      />
    </div>
  );
}

function RightSection() {
  return (
    <div className="flex flex-col justify-center items-center w-full p-content-full">
      <h2 className="text-xl text-center font-bold mb-8">
        <p>Introduce el correo electrónico</p>
        <p>asociado a tu cuenta de Inverclick</p>
      </h2>
      <form className="flex flex-col gap-4 items-center w-full">
        <Input type="email" placeholder="Correo electrónico" />
        <Input type="password" placeholder="Contraseña" />
        <Link href="/" className="self-start text-primary mb-4">
          He olvidado mi contraseña
        </Link>
        <Button rounded="full" size="lg">
          Iniciar sesión
        </Button>
        <OrSeparator />
        <Button rounded="full" size="xl" variant="outline" className="w-full">
          <Image
            src="/icons/google.svg"
            alt="Google icon"
            width={24}
            height={24}
            className="mr-2"
          />
          Continuar con Google
        </Button>
        <Link href="/" className="text-primary">
          Crear una cuenta
        </Link>
        <DownloadAppModal />
        <Link href="/" className="lg:hidden text-primary">
          Soy constructora
        </Link>
      </form>
    </div>
  );
}

function OrSeparator() {
  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <span className="relative px-3 text-gray-500 bg-white">o</span>
    </div>
  );
}
