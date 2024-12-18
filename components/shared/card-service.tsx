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
        "flex flex-col p-4 rounded-xl shadow-2xl bg-white hover:scale-105 transition-transform",
        className
      )}
      {...props}
    >
      <h2
        className={cn("font-bold text-lg", {
          "border-l-4 border-black pl-2 mb-2": !description,
        })}
      >
        {title}
      </h2>
      {description && (
        <div className="border-l-4 border-black my-2 pl-2 flex items-center h-8">
          <h3 className=" text-xs">{description}</h3>
        </div>
      )}
      <button className="self-end bg-black p-1 rounded-full">
        <Plus color="white" size={16} />
      </button>
    </Link>
  );
}
