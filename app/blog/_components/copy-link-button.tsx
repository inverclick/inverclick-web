"use client";

import { Link2 } from "lucide-react";
import { toast } from "sonner";

export type CopyLinkButtonProps = Readonly<{
  url: string;
  className?: string;
}>;

export function CopyLinkButton({ url, className }: CopyLinkButtonProps) {
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("¡Enlace copiado!");
    } catch {
      toast.error("No pudimos copiar el enlace");
    }
  };

  return (
    <button
      type="button"
      onClick={copyLink}
      aria-label="Copiar enlace"
      title="Copiar enlace"
      className={className}
    >
      <Link2 className="size-[18px]" aria-hidden="true" />
    </button>
  );
}
