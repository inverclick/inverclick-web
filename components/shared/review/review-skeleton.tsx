import { Skeleton } from "@inverclick/inverclick-ui/skeleton";

export function ReviewSkeleton() {
  return (
    <article>
      <div className="mb-4 flex items-center gap-4">
        <Skeleton className="size-10 rounded-full" />
        <Skeleton className="h-4 w-52" />
      </div>
      <div className="mb-4 flex items-center gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-24" />
      </div>
      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-52" />
      </div>
    </article>
  );
}
