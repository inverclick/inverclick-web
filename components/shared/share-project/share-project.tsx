"use client";

import { cn } from "@/lib/utils";
import { Button } from "@inverclick/inverclick-ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@inverclick/inverclick-ui/dialog";
import { Icon } from "@inverclick/inverclick-ui/icon";
import { Copy, MessageCircle, Share } from "lucide-react";
import { ComponentProps, useState } from "react";
import { toast } from "sonner";

export type ShareProjectProps = {
  isDisabled?: boolean;
  isIconOnly?: boolean;
  classNames?: {
    triggerButton?: string;
  };
  properties?: {
    triggerButton?: ComponentProps<typeof Button>;
  };
} & ComponentProps<typeof DialogTrigger>;

export const ShareProject = ({
  isIconOnly = false,
  classNames,
  properties,
  ...props
}: ShareProjectProps) => {
  const [open, setOpen] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("¡Enlace copiado!");
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${window?.location.href}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className={cn(props.className)} {...props}>
        <Button
          variant="outline"
          className={cn(classNames?.triggerButton)}
          onClick={() => setOpen(true)}
          {...properties?.triggerButton}
        >
          <Icon icon={Share} />
          {!isIconOnly && "Compartir"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Comparte este proyecto</DialogTitle>
          <DialogDescription>
            Comparte este proyecto para que otros puedan verlo.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button variant="outline" onClick={copyLink}>
            <Icon icon={Copy} />
            Copiar link
          </Button>
          <Button variant="outline" onClick={shareWhatsApp}>
            <Icon icon={MessageCircle} />
            WhatsApp
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
