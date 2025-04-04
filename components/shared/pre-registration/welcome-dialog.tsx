"use client";

import {
  WELCOME_DESCRIPTION,
  WELCOME_TITLE,
} from "@/components/shared/pre-registration/messages";
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
import { useEffect } from "react";

import confetti from "canvas-confetti";

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
          <DialogTitle>{WELCOME_TITLE}</DialogTitle>
          <DialogDescription>{WELCOME_DESCRIPTION}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Continuar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
