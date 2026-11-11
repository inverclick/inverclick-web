"use client";

import { cn } from "@/lib/utils";
import { highlight } from "@/lib/project-search";
import { getAssetUrl } from "@/services/utils";
import { Building2, MapPin, Search } from "lucide-react";
import Image from "next/image";
import { ReactNode, useState } from "react";

/** One selectable row of the search panel. */
export type SearchOption =
  | { kind: "submit"; key: string; label: string; subtitle: string }
  | { kind: "location"; key: string; label: string; subtitle: string }
  | {
      kind: "project";
      key: string;
      label: string;
      subtitle: string;
      photo: string | null;
    };

type Props = Readonly<{
  id: string;
  query: string;
  options: SearchOption[];
  activeIndex: number;
  showingPopular: boolean;
  onChoose: (option: SearchOption) => void;
  onHover: (index: number) => void;
}>;

export const optionId = (listId: string, index: number) =>
  `${listId}-option-${index}`;

export function SearchSuggestions({
  id,
  query,
  options,
  activeIndex,
  showingPopular,
  onChoose,
  onHover,
}: Props) {
  const trimmed = query.trim();
  const hasMatches = options.some((option) => option.kind !== "submit");

  return (
    <div className="py-2">
      {showingPopular && options.length > 0 ? (
        <p className="px-5 pb-1 pt-1.5 text-xs font-semibold text-[#717171]">
          Ciudades con proyectos
        </p>
      ) : null}
      <ul id={id} role="listbox" aria-label="Sugerencias de búsqueda">
        {options.map((option, index) => (
          <li
            key={option.key}
            id={optionId(id, index)}
            role="option"
            aria-selected={index === activeIndex}
            // Keep focus in the input: choosing happens on mouse down.
            onMouseDown={(event) => {
              event.preventDefault();
              onChoose(option);
            }}
            onMouseMove={() => index !== activeIndex && onHover(index)}
            className={cn(
              "flex cursor-pointer items-center gap-3.5 px-4 py-[7px]",
              index === activeIndex && "bg-[#F7F7F7]"
            )}
          >
            <span className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F2F2F2] text-[#222222]">
              <OptionIcon option={option} />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate text-[15px] leading-5 text-[#222222]">
                {option.kind === "submit" ? (
                  <>
                    Buscar «<span className="font-semibold">{trimmed}</span>»
                  </>
                ) : (
                  <Highlighted
                    text={option.label}
                    query={showingPopular ? "" : query}
                  />
                )}
              </span>
              <span className="truncate text-[13px] leading-[17px] text-[#717171]">
                {option.subtitle}
              </span>
            </span>
          </li>
        ))}
      </ul>
      {trimmed && !hasMatches ? (
        <div className="flex flex-col gap-1 px-5 py-3">
          <p className="text-[15px] font-semibold text-[#222222]">
            Sin coincidencias
          </p>
          <p className="text-[13px] leading-[18px] text-[#717171]">
            No encontramos proyectos ni ciudades para «{trimmed}». Revisa la
            ortografía o prueba con otra ciudad.
          </p>
        </div>
      ) : null}
    </div>
  );
}

function OptionIcon({ option }: { option: SearchOption }): ReactNode {
  if (option.kind === "submit") return <Search className="h-6 w-6" />;
  if (option.kind === "location") return <MapPin className="h-6 w-6" />;
  return <ProjectThumb photo={option.photo} />;
}

function ProjectThumb({ photo }: { photo: string | null }) {
  const [failed, setFailed] = useState(false);
  if (!photo || failed) return <Building2 className="h-6 w-6" />;
  return (
    <Image
      src={getAssetUrl(photo)}
      alt=""
      fill
      sizes="52px"
      className="object-cover"
      onError={() => setFailed(true)}
    />
  );
}

function Highlighted({ text, query }: { text: string; query: string }) {
  return (
    <>
      {highlight(text, query).map((segment, index) =>
        segment.bold ? (
          <span key={index} className="font-semibold">
            {segment.text}
          </span>
        ) : (
          <span key={index}>{segment.text}</span>
        )
      )}
    </>
  );
}
