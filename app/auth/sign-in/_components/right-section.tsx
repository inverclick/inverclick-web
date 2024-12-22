"use client";

import { OrSeparator } from "@/components/shared/or-separator/or-separator";
import { DownloadAppModal } from "@/components/sign-in/download-app-modal";
import { Button } from "@inverclick/inverclick-ui/button";
import { Input } from "@inverclick/inverclick-ui/input";
import { useSearchParams } from "next/navigation";

import Image from "next/image";
import Link from "next/link";

export const RightSection = () => {
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col justify-center items-center w-full p-content-full">
      <h2 className="text-xl text-center font-bold mb-8">
        <p>Digita el correo electrónico</p>
        <p>asociado a tu cuenta de Inverclick</p>
      </h2>
      <form className="flex flex-col gap-4 items-center w-full">
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={searchParams.get("email") || ""}
        />
        <Input type="password" placeholder="Contraseña" />
        <Link href="/" className="self-start text-primary mb-4">
          He olvidado mi contraseña
        </Link>
        <Button rounded="full" size="lg">
          Iniciar sesión
        </Button>
        <OrSeparator />
        <Button rounded="full" variant="outline" className="w-full">
          <Image
            src="/icons/google.svg"
            alt="Google icon"
            width={24}
            height={24}
            className="mr-2"
          />
          Continuar con Google
        </Button>
        <Link href="/auth/sign-up" className="text-primary">
          Crear una cuenta
        </Link>
        <DownloadAppModal />
        <Link href="/" className="lg:hidden text-primary">
          Soy constructora
        </Link>
      </form>
    </div>
  );
};
