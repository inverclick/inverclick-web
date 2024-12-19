import { Button } from "@inverclick/inverclick-ui/button";
import { Input } from "@inverclick/inverclick-ui/input";
import { ArrowLeft } from "lucide-react";

import Link from "next/link";

export type StepTwoProps = Readonly<{
  onBack: () => void;
}>;

export function StepTwo({ onBack }: StepTwoProps) {
  return (
    <div className="flex flex-col w-full p-content-full h-[600px]">
      <h2 className="text-xl text-center font-bold mb-8">
        Continúa creando tu cuenta
      </h2>
      <form className="flex flex-col gap-4 items-center w-full">
        <Input type="text" placeholder="Nombre" />
        <Input type="text" placeholder="Apellido" />
        <div className="flex gap-4 mb-8">
          <Button variant="ghost" rounded="full" size="lg" onClick={onBack}>
            <ArrowLeft className="mr-2" />
            <span className="underline">Volver</span>
          </Button>
          <Button rounded="full" size="lg">
            Siguiente
          </Button>
        </div>
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
      </form>
    </div>
  );
}
