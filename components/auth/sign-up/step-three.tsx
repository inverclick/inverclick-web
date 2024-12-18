import { Button } from "@inverclick/inverclick-ui/button";
import { Input } from "@inverclick/inverclick-ui/input";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";

type StepThreeProps = Readonly<{
  onBack: () => void;
}>;

export function StepThree({ onBack }: StepThreeProps) {
  return (
    <div className="flex flex-col w-full p-content-full h-[600px]">
      <h2 className="text-xl text-center font-bold mb-8">
        Ya casi puedes iniciar sesión
      </h2>
      <form className="flex flex-col gap-4 items-center w-full">
        <Input type="password" placeholder="Contraseña" />
        <Input type="password" placeholder="Confirmar contraseña" />
        <div className="flex gap-4 mb-8">
          <Button variant="ghost" rounded="full" size="lg" onClick={onBack}>
            <ArrowLeft className="mr-2" />
            <span className="underline">Volver</span>
          </Button>
        </div>
        <p className="text-center mb-8">
          Al registrarte, aceptas nuestras{" "}
          <Link href="/policy" className="font-bold underline">
            Políticas de Privacidad
          </Link>{" "}
          y{" "}
          <Link href="/terms-conditions" className="font-bold underline">
            Términos y Condiciones
          </Link>
        </p>
        <Button rounded="full" size="lg">
          Registrarme
        </Button>
      </form>
    </div>
  );
}
