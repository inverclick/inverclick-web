"use client";

import { usePreRegistration } from "@/contexts/pre-registration-context";
import { Button } from "@inverclick/inverclick-ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@inverclick/inverclick-ui/dialog";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { confetti } from "@tsparticles/confetti";
import { useEffect } from "react";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export const WelcomeDialog = () => {
  const { welcomeDialogOpen } = usePreRegistration();

  return <>{welcomeDialogOpen && <WelcomeDialogContent />}</>;
};

const WelcomeDialogContent = () => {
  const { welcomeDialogOpen, setWelcomeDialogOpen } = usePreRegistration();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <Dialog open={welcomeDialogOpen} onOpenChange={setWelcomeDialogOpen}>
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>Bienvenido a bordo</DialogTitle>
          <VisuallyHidden.Root>
            <DialogDescription>Bienvenido a bordo</DialogDescription>
          </VisuallyHidden.Root>
        </DialogHeader>
        <Typography>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
          quos eum dicta? Similique maiores voluptas perferendis sapiente
          voluptate obcaecati non nemo saepe quo, nesciunt autem, esse odio
          numquam laborum? Voluptate!
        </Typography>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Continuar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
