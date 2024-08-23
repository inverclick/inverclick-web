"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DialogHeader } from "@/components/ui/dialog";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function DownloadAppModal() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <p className="text-primary cursor-pointer">
          Inténtalo desde nuestra Aplicación Móvil
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-xl">
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
      </AlertDialogContent>
    </AlertDialog>
  );
}
