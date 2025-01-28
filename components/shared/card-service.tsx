import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { ComponentProps } from "react";

import Link from "next/link";

export type CardServiceProps = Readonly<{
  link: string;
  title: string;
  description?: string;
}> &
  ComponentProps<typeof Link>;

export function CardService({
  title,
  description,
  link,
  className,
  ...props
}: Omit<CardServiceProps, "href">) {
  return (
    <Link
      href={link}
      className={cn(
        "flex flex-col rounded-xl bg-white p-4 shadow-2xl transition-transform hover:scale-105",
        className
      )}
      {...props}
    >
      <h2
        className={cn("text-lg font-bold", {
          "mb-2 border-l-4 border-black pl-2": !description,
        })}
      >
        {title}
      </h2>
      {description && (
        <div className="my-2 flex h-8 items-center border-l-4 border-black pl-2">
          <h3 className="text-xs">{description}</h3>
        </div>
      )}
      <button className="self-end rounded-full bg-black p-1">
        <Plus color="white" size={16} />
      </button>
    </Link>
  );
}
