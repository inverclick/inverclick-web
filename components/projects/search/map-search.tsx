"use client";

import { useProjectsPageStore } from "@/app/projects/_store";
import { useDebounce } from "@/hooks/use-debounce";
import {
  filterByText,
  getPopularLocations,
  getSearchSuggestions,
} from "@/lib/project-search";
import { cn } from "@/lib/utils";
import { ProjectSearchEntry } from "@/services/projects/project-search-index";
import { ProjectToDisplay } from "@/types/domain/projects";
import { Loader2, Search, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  CSSProperties,
  KeyboardEvent,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { createPortal } from "react-dom";
import {
  SearchOption,
  SearchSuggestions,
  optionId,
} from "./search-suggestions";

type Props = Readonly<{
  /** Every published project, for suggestions. */
  searchIndex: ProjectSearchEntry[];
  /** Current results (URL filters applied), for counts and map focus. */
  projects: ProjectToDisplay[];
  className?: string;
}>;

const plural = (count: number, one: string, many: string) =>
  `${count} ${count === 1 ? one : many}`;

/**
 * Airbnb-style search over the map. The field holds free text, which filters
 * the loaded results in memory, or a chosen city, which is the same
 * `department`/`city` URL filter the filters dialog edits. Typing over a city
 * replaces it.
 */
export function MapSearch({ searchIndex, projects, className }: Props) {
  const searchText = useProjectsPageStore((state) => state.searchText);
  const setSearchText = useProjectsPageStore((state) => state.setSearchText);
  const setLoadingResults = useProjectsPageStore(
    (state) => state.setLoadingResults
  );
  const focusProject = useProjectsPageStore((state) => state.focusProject);
  const fitResults = useProjectsPageStore((state) => state.fitResults);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [panelStyle, setPanelStyle] = useState<CSSProperties | null>(null);

  const department = searchParams.get("department");
  const city = searchParams.get("city");
  const locationKey = `${department ?? ""}|${city ?? ""}`;
  // The location the user typed over. Hidden right away, even while the URL
  // without it is still loading, so it can't reappear or be removed twice.
  const [replacedLocation, setReplacedLocation] = useState<string | null>(null);

  const urlLocationLabel = useMemo(() => {
    if (city) {
      const entry = searchIndex.find((e) => e.city?.id === Number(city));
      if (entry?.city && entry.department) {
        return `${entry.city.name}, ${entry.department.name}`;
      }
    }
    if (department) {
      return (
        searchIndex.find((e) => e.department?.id === Number(department))
          ?.department?.name ?? ""
      );
    }
    return "";
  }, [searchIndex, city, department]);
  const locationLabel =
    replacedLocation === locationKey ? "" : urlLocationLabel;

  const showingLocation = !searchText && Boolean(locationLabel);
  const value = searchText || locationLabel;
  const query = searchText.trim();

  const resultCount = useMemo(
    () => filterByText(projects, query).length,
    [projects, query]
  );

  const options = useMemo<SearchOption[]>(() => {
    const { locations, projects: matches } = query
      ? getSearchSuggestions(searchIndex, query)
      : { locations: getPopularLocations(searchIndex), projects: [] };
    const rows: SearchOption[] = [];
    if (query) {
      rows.push({
        kind: "submit",
        key: "submit",
        label: query,
        subtitle: plural(resultCount, "resultado", "resultados"),
      });
    }
    for (const location of locations) {
      rows.push({
        kind: "location",
        key: `city-${location.cityId}`,
        label: location.label,
        subtitle: plural(location.count, "proyecto", "proyectos"),
      });
    }
    for (const { project, location } of matches) {
      rows.push({
        kind: "project",
        key: `project-${project.id}`,
        label: project.name ?? "",
        subtitle: location,
        photo: project.photos[0] ?? null,
      });
    }
    return rows;
  }, [query, searchIndex, resultCount]);

  // Results load while the URL changes: tell the list and the map.
  useEffect(() => {
    setLoadingResults(isPending);
  }, [isPending, setLoadingResults]);

  const setLocation = useCallback(
    (next: { departmentId: number; cityId: number } | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next) {
        params.set("department", String(next.departmentId));
        params.set("city", String(next.cityId));
      } else {
        params.delete("department");
        params.delete("city");
      }
      // Mark loading now so the map doesn't frame the old results meanwhile.
      setLoadingResults(true);
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, searchParams, setLoadingResults]
  );

  const close = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
  }, []);

  const submit = () => {
    close();
    inputRef.current?.blur();
    if (query && resultCount > 0) fitResults();
  };

  const choose = (option: SearchOption) => {
    if (option.kind === "submit") return submit();
    close();
    inputRef.current?.blur();
    setSearchText("");

    if (option.kind === "location") {
      const cityId = Number(option.key.replace("city-", ""));
      const entry = searchIndex.find((e) => e.city?.id === cityId);
      if (!entry?.department) return;
      setLocation({ departmentId: entry.department.id, cityId });
      fitResults();
      return;
    }

    const id = option.key.replace("project-", "");
    if (projects.some((project) => project.id === id)) {
      focusProject(id);
      return;
    }
    // The filters hide it: open its page, like the project cards do.
    const typologyId = searchIndex.find((e) => e.id === id)?.typologies[0]?.id;
    if (typologyId) {
      window.open(`/projects/${id}/${typologyId}`, "_blank", "noopener");
    }
  };

  const onChange = (next: string) => {
    if (showingLocation) {
      setReplacedLocation(locationKey);
      setLocation(null);
    }
    setSearchText(next);
    setOpen(true);
    setActiveIndex(-1);
  };

  const clear = () => {
    setSearchText("");
    if ((department || city) && replacedLocation !== locationKey) {
      setReplacedLocation(locationKey);
      setLocation(null);
    }
    setActiveIndex(-1);
    setOpen(true);
    inputRef.current?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) setOpen(true);
      if (!options.length) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) =>
        index === -1 && step === -1
          ? options.length - 1
          : (index + step + options.length) % options.length
      );
    } else if (event.key === "Enter") {
      event.preventDefault();
      if (open && activeIndex >= 0 && options[activeIndex]) {
        choose(options[activeIndex]);
      } else {
        submit();
      }
    } else if (event.key === "Escape") {
      if (open) {
        event.preventDefault();
        close();
      } else {
        inputRef.current?.blur();
      }
    }
  };

  // Close on clicks outside the field and the panel.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (
        fieldRef.current?.contains(target) ||
        panelRef.current?.contains(target)
      ) {
        return;
      }
      close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, close]);

  // The map panel clips its content, so the panel is portaled and placed under
  // the field, using the space left in the viewport.
  useLayoutEffect(() => {
    if (!open) return;
    const place = () => {
      const rect = fieldRef.current?.getBoundingClientRect();
      if (!rect) return;
      const viewportHeight =
        window.visualViewport?.height ?? window.innerHeight;
      setPanelStyle({
        position: "fixed",
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
        maxHeight: Math.max(180, viewportHeight - rect.bottom - 24),
      });
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    window.visualViewport?.addEventListener("resize", place);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
      window.visualViewport?.removeEventListener("resize", place);
    };
  }, [open]);

  // Keep the highlighted row visible while moving with the keyboard.
  useEffect(() => {
    if (activeIndex < 0) return;
    document
      .getElementById(optionId(listId, activeIndex))
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, listId]);

  // Screen readers hear the result count once typing settles.
  const settledQuery = useDebounce(query, 700);
  const settledCount = useDebounce(resultCount, 700);
  const announcement =
    open && settledQuery
      ? plural(settledCount ?? resultCount, "resultado", "resultados")
      : "";

  const busy = isPending;

  return (
    <div ref={fieldRef} className={cn("relative w-full max-w-md", className)}>
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#717171]">
        {busy ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
        ) : (
          <Search className="h-5 w-5" aria-hidden />
        )}
      </span>
      <input
        ref={inputRef}
        type="text"
        role="combobox"
        aria-label="Buscar proyecto o ciudad"
        aria-autocomplete="list"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={
          open && activeIndex >= 0 ? optionId(listId, activeIndex) : undefined
        }
        aria-busy={busy}
        autoComplete="off"
        autoCorrect="off"
        spellCheck={false}
        enterKeyHint="search"
        placeholder="Busca proyecto o ciudad"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={(event) => {
          setOpen(true);
          // A chosen city is selected so typing replaces it.
          if (showingLocation) event.target.select();
        }}
        onKeyDown={onKeyDown}
        className={cn(
          "h-12 w-full rounded-full border border-black/5 bg-white pl-12 text-[15px] text-[#222222] shadow-[0_2px_10px_rgba(0,0,0,0.16)] outline-none transition-shadow placeholder:text-[#8A8A8A] focus:shadow-[0_4px_16px_rgba(0,0,0,0.2)] focus-visible:ring-2 focus-visible:ring-primary-600/40",
          value ? "pr-12" : "pr-5"
        )}
      />
      {value ? (
        <button
          type="button"
          aria-label="Borrar búsqueda"
          onClick={clear}
          className="absolute right-2.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-[#EBEBEB] text-[#222222] transition-colors hover:bg-[#DDDDDD]"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
      <span className="sr-only" aria-live="polite">
        {announcement}
      </span>
      {open && panelStyle
        ? createPortal(
            <div
              ref={panelRef}
              style={panelStyle}
              className="z-50 animate-fade-in overflow-y-auto overscroll-contain rounded-3xl border border-black/5 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.14)] animate-duration-150"
            >
              <SearchSuggestions
                id={listId}
                query={searchText}
                options={options}
                activeIndex={activeIndex}
                showingPopular={!query}
                onChoose={choose}
                onHover={setActiveIndex}
              />
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
