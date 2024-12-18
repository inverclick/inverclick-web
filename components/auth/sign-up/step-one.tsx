import { OrSeparator } from "@/components/shared/or-separator/or-separator";
import { DownloadAppModal } from "@/components/sign-in/download-app-modal";
import { Button } from "@inverclick/inverclick-ui/button";
import { Input } from "@inverclick/inverclick-ui/input";

import Image from "next/image";
import Link from "next/link";

export function StepOne() {
  return (
    <div className="flex flex-col w-full p-content-full h-[600px]">
      <h2 className="text-xl text-center font-bold mb-8">¡Empecemos!</h2>
      <p className="mb-8">
        ¿Ya tienes una cuenta?{" "}
        <Link href="/auth/sign-in" className="text-primary">
          Inicia sesión
        </Link>
      </p>
      <form className="flex flex-col gap-4 items-center w-full">
        <Input type="email" placeholder="Correo electrónico" />
        <Button rounded="full" size="lg">
          Siguiente
        </Button>
        <OrSeparator text="Continúa con" />
        <Button rounded="full" variant="outline" className="w-full mb-8">
          <Image
            src="/icons/google.svg"
            alt="Google icon"
            width={24}
            height={24}
            className="mr-2"
          />
          Continuar con Google
        </Button>
        <p className="text-center">
          Al registrarte, aceptas nuestras{" "}
          <Link href="/policy" className="font-bold underline">
            Políticas de Privacidad
          </Link>{" "}
          y{" "}
          <Link href="/terms-conditions" className="font-bold underline">
            Términos y Condiciones
          </Link>
        </p>
        <DownloadAppModal />
        <Link href="/" className="lg:hidden text-primary">
          Soy constructora
        </Link>
      </form>
    </div>
  );
}
