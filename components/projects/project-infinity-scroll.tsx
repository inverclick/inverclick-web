"use client";

import { useProjectsPageStore } from "@/app/projects/_store";
import { LazyMount } from "@/components/shared/lazy-mount";
import {
  ProjectCard,
  ProjectCardSkeleton,
} from "@/components/shared/project-card";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export const ProjectInfinityScroll = ({
  empty = false,
}: Readonly<{ empty?: boolean }>) => {
  const _projects = useProjectsPageStore((state) => state.projects);
  const loadingResults = useProjectsPageStore((state) => state.loadingResults);

  if (empty && !loadingResults) return <EmptyResults />;

  return (
    <div
      aria-busy={loadingResults}
      className={cn(
        "overflow-y-auto transition-opacity duration-200",
        // Dimmed while new results load after a city or filter change.
        loadingResults && "pointer-events-none opacity-50"
      )}
    >
      <div className="mt-4 grid w-full justify-items-center gap-x-2 gap-y-10 pb-4 [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))] lg:[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))] 2xl:[grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]">
        {_projects.map((project) => (
          <LazyMount key={project.id} placeholder={<ProjectCardSkeleton />}>
            <ProjectCard project={project} />
          </LazyMount>
        ))}
      </div>
    </div>
  );
};

function EmptyResults() {
  const setSearchText = useProjectsPageStore((state) => state.setSearchText);
  const router = useRouter();
  const pathname = usePathname();

  const clear = () => {
    setSearchText("");
    router.replace(pathname, { scroll: false });
  };

  return (
    <div className="flex flex-col items-center gap-2 px-6 pt-12 text-center">
      <span className="mb-2 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F2F2F2] text-[#222222]">
        <Search className="h-6 w-6" aria-hidden />
      </span>
      <p className="text-[17px] font-semibold text-[#222222]">
        No hay proyectos para tu búsqueda
      </p>
      <p className="text-sm text-[#717171]">
        Prueba con otro nombre o ciudad, o quita los filtros.
      </p>
      <button
        type="button"
        onClick={clear}
        className="mt-3 min-h-11 rounded-full border border-[#222222] px-5 text-sm font-semibold text-[#222222] transition-colors hover:bg-[#F7F7F7]"
      >
        Limpiar búsqueda y filtros
      </button>
    </div>
  );
}

// "use client";

// import { useProjectsPageStore } from "@/app/projects/_store";
// import { getGridColumns } from "@/lib/get-column-count";
// import { cn } from "@/lib/utils";
// import { IBLUEPRINT_POPULATED } from "@/types/blueprint";
// import { useCallback, useEffect, useState } from "react";
// import { useMediaQuery } from "usehooks-ts";
// import { ProjectCard } from "@/components/shared/ProjectCard";
// import { ScrollArea } from "@radix-ui/react-scroll-area";

// interface Props {
//   blueprints: IBLUEPRINT_POPULATED[];
// }

// export const ProjectInfinityScroll = ({ blueprints }: Props) => {
//   const _blueprints = useProjectsPageStore((state) => state.blueprints);

//   const [cellWidth, setCellWidth] = useState(290);

//   const matchesLg = useMediaQuery(
//     "(min-width: 1024px) and (max-width: 1535px)"
//   );

//   const matches2xl = useMediaQuery("(min-width: 1536px)");

//   const matchesMoreThanLg = useMediaQuery("(min-width: 1024px)");

//   useEffect(() => {
//     if (matchesLg) {
//       setCellWidth(220);
//     } else if (matches2xl) {
//       setCellWidth(290);
//     } else {
//       setCellWidth(290);
//     }
//   }, [matchesLg, matches2xl]);

//   const [grid, setGrid] = useState<HTMLDivElement | null>(null);
//   const [child, setChild] = useState<HTMLDivElement | null>(null);
//   const [columns, setColumns] = useState(0);

//   const assignGrid = useCallback((element: HTMLDivElement | null) => {
//     setGrid(element);
//   }, []);

//   const assignChild = useCallback((element: HTMLDivElement | null) => {
//     setChild(element);
//   }, []);

//   useEffect(() => {
//     let observer: ResizeObserver;

//     const calculateColumns = ({
//       gridWidth,
//       childWidth,
//     }: {
//       gridWidth: number;
//       childWidth: number;
//     }) => {
//       const columns = getGridColumns({
//         gridWidth,
//         childWidth,
//         gap: 8,
//       });

//       if (!isNaN(columns)) {
//         setColumns(columns);
//       }
//     };

//     // Run calculateColumns when grid size changes using ResizeObserver
//     if (grid && child) {
//       observer = new ResizeObserver(() => {
//         calculateColumns({
//           gridWidth: grid.offsetWidth,
//           childWidth: cellWidth,
//         });
//       });

//       observer.observe(grid);

//       calculateColumns({
//         gridWidth: grid.offsetWidth,
//         childWidth: cellWidth,
//       });
//     }

//     return () => {
//       if (observer) {
//         observer.disconnect();
//       }
//     };
//   }, [grid, child, cellWidth]);

//   return (
//     <ScrollArea>
//       <div
//         ref={assignGrid}
//         className="mt-4 w-full gap-y-10 gap-x-2 pb-4 grid justify-items-center [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))] lg:[grid-template-columns:repeat(auto-fill,minmax(220px,1fr))] 2xl:[grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]"
//       >
//         {_blueprints.map((blueprint, index) => {
//           const isFirstColumn = index % columns === 0;
//           const isLastColumn = index % columns === columns - 1;

//           let align: "start" | "end" | undefined = undefined;

//           if (isFirstColumn) align = "start";
//           if (isLastColumn) align = "end";

//           return (
//             <ProjectCard
//               key={blueprint._id}
//               blueprint={blueprint}
//               className={cn({
//                 "justify-self-start": matchesMoreThanLg && align === "start",
//                 "justify-self-end": matchesMoreThanLg && align === "end",
//                 "justify-self-center": columns === 1,
//               })}
//               ref={assignChild}
//             />
//           );
//         })}
//       </div>
//     </ScrollArea>
//   );
// };
