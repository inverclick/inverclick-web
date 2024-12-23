"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@inverclick/inverclick-ui/dialog";
import { X } from "lucide-react";
import { useState } from "react";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@inverclick/inverclick-ui/button";

export function DownloadAppModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="link">Inténtalo desde nuestra Aplicación Móvil</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <X
            onClick={() => setIsOpen(false)}
            className="cursor-pointer text-primary"
          />
        </DialogHeader>
        <h2 className="text-center text-4xl font-bold">
          <p>
            Descarga nuestra <span className="text-primary">APP</span>
          </p>
          <p>y haz tu mejor inversión</p>
        </h2>
        <p className="text-center mb-4">
          Escanea el código para descargar la aplicación móvil
        </p>
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
