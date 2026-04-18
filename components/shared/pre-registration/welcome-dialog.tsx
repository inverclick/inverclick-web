"use client";

import { usePreRegistration } from "@/contexts/pre-registration-context";
import { Button } from "@inverclick/inverclick-ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@inverclick/inverclick-ui/dialog";
import {
  ArrowRight,
  FolderOpen,
  Mail,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

import confetti from "canvas-confetti";

export const WelcomeDialog = () => {
  const { welcomeDialogOpen } = usePreRegistration();

  return <>{welcomeDialogOpen && <WelcomeDialogContent />}</>;
};

const WelcomeDialogContent = () => {
  const { welcomeDialogOpen, setWelcomeDialogOpen } = usePreRegistration();

  useEffect(() => {
    if (!welcomeDialogOpen) {
      return;
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, [welcomeDialogOpen]);

  return (
    <Dialog open={true} onOpenChange={setWelcomeDialogOpen}>
      <DialogContent
        hideCloseButton
        className="max-w-5xl overflow-hidden !rounded-[28px] !p-0"
      >
        <DialogTitle className="sr-only">Bienvenido a bordo</DialogTitle>
        <DialogDescription className="sr-only">
          Revisa tu correo y sigue los pasos para continuar con tu registro.
        </DialogDescription>

        <section className="grid bg-white md:grid-cols-[0.95fr_1.2fr]">
          <div className="relative hidden min-h-[560px] overflow-hidden bg-[radial-gradient(circle_at_top,_#ede7ff,_#d9cffd_48%,_#c9b8fb_100%)] md:block">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.02))]" />
              <Image
                unoptimized
                width={172}
                height={40}
                className="h-auto w-32 mix-blend-multiply m-10"
                src="/main-page/inverclick-logo.avif"
                alt="Inverclick"
              />
            <div className="absolute inset-x-0 bottom-0 top-24 flex items-end justify-center px-8">
              <Image
                unoptimized
                width={780}
                height={780}
                className="h-auto w-full max-w-[440px] object-contain object-bottom"
                src="/preregistro/casa.webp"
                alt="Elemento decorativo de bienvenida"
              />
            </div>
          </div>

          <div className="relative flex min-h-[560px] flex-col px-6 py-7 sm:px-9 sm:py-8 md:px-12 md:py-10">
            <DialogClose asChild>
              <button
                type="button"
                className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-700"
                aria-label="Cerrar modal de bienvenida"
              >
                <X className="h-5 w-5" />
              </button>
            </DialogClose>

            <div className="mx-auto flex w-full max-w-[420px] flex-1 flex-col justify-center gap-8">
              <div className="space-y-5 text-center flex flex-col items-center">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#efe8ff] text-[#5b3df5] md:mx-0">
                  <Mail className="h-9 w-9" />
                </div>

                  <h2 className="text-4xl font-semibold leading-[1.02] tracking-[-0.045em] text-slate-900 whitespace-nowrap">
                    ¡Bienvenido<span className="text-[#5b3df5]"> a bordo!</span>
                  </h2>
                  <p className="max-w-[30ch] text-center text-base leading-6 text-slate-600 md:max-w-[33ch]">
                    Hemos enviado un enlace a tu correo para continuar con tu registro.
                  </p>
              </div>

              <div className="space-y-5">
                <FeatureItem
                  icon={<ShieldCheck className="h-5 w-5" />}
                  title="Revisa tu bandeja de entrada"
                  description="y la carpeta de spam, si es necesario."
                />
                <FeatureItem
                  icon={<FolderOpen className="h-5 w-5" />}
                  title="Completa el proceso"
                  description="y personaliza tu experiencia."
                />
                <FeatureItem
                  icon={<Sparkles className="h-5 w-5" />}
                  title="Explora, sueña y encuentra"
                  description="tu próximo hogar ideal."
                />
              </div>

              <DialogClose asChild>
                <Button className="h-14 w-full rounded-xl bg-[#5b3df5] text-base font-semibold text-white shadow-[0_20px_40px_rgba(91,61,245,0.26)] hover:bg-[#5032ef]">
                  <span>Entendido, gracias</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </DialogClose>
            </div>
          </div>
        </section>
      </DialogContent>
    </Dialog>
  );
};

type FeatureItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureItem = ({ icon, title, description }: FeatureItemProps) => {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#f3eeff] text-[#6c47ff]">
        {icon}
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold leading-6 text-slate-900">{title}</p>
        <p className="text-sm leading-5 text-slate-500">{description}</p>
      </div>
    </div>
  );
};
