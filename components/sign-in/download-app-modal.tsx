"use client";

import { Button } from "@inverclick/inverclick-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@inverclick/inverclick-ui/dialog";
import { Typography } from "@inverclick/inverclick-ui/typography";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

export function DownloadAppModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link">Inténtalo desde nuestra Aplicación Móvil</Button>
      </DialogTrigger>
      <DialogContent>
        <VisuallyHidden.Root>
          <DialogHeader>
            <DialogTitle>Descargar nuestra Aplicación Móvil</DialogTitle>
            <DialogDescription>
              Escanea el código para descargar la aplicación móvil
            </DialogDescription>
          </DialogHeader>
        </VisuallyHidden.Root>
        <Typography variant="h2" className="text-center">
          <p>
            Descarga nuestra <span className="text-primary">aplicación</span>
          </p>
          <p>y haz tu mejor inversión</p>
        </Typography>
        <Typography className="mb-4 text-center">
          Escanea el código para descargar la aplicación móvil
        </Typography>
        <Image
          src="/app-qr.png"
          width={200}
          height={200}
          alt="Mobile app QR"
          className="mx-auto"
        />
        <Link href="/">
          <Image
            unoptimized
            width="170"
            height="60"
            className="mx-auto mb-4"
            src="/main-page/inverclick-logo.avif"
            alt="Inverclick logo"
          />
        </Link>
      </DialogContent>
    </Dialog>
  );
}
