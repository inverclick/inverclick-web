import { CardService } from "@/components/shared/card-service";
import { MyFooter } from "@/components/shared/footer/MyFooter";
import { MyHeaderAllServices } from "@/components/shared/header/MyHeaderAllServices";
import { DownloadAppModal } from "@/components/sign-in/download-app-modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <MyHeaderAllServices />
      <article className="relative flex w-full h-screen-with-header m-screen-with-header">
        <Background />
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="grid grid-cols-2 max-w-screen-2xl h-full mx-auto">
            <LeftSection />
            <RightSection />
          </div>
        </div>
      </article>
      <MyFooter />
    </main>
  );
}

function Background() {
  return (
    <div className="grid grid-cols-2 w-full h-full">
      <div className="bg-primary-200"></div>
      <div className="bg-white"></div>
    </div>
  );
}

function LeftSection() {
  return (
    <div className="flex justify-center items-center h-full p-32">
      <h2 className="text-5xl font-bold">
        <p>¡Nos alegramos</p>
        <p>
          de volver a <span className="text-primary-500">VERTE!</span>
        </p>
      </h2>
      <CardService
        title="Soy constructora"
        link="/"
        className="absolute bottom-4 left-4"
      />
    </div>
  );
}

function RightSection() {
  return (
    <div className="flex flex-col justify-center items-center w-full p-32">
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
