import { Skeleton } from "@/components/ui/skeleton"

export function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
          <div className="p-0">
            <Skeleton className="h-48 w-full" />
          </div>
          <div className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-10" />
            </div>
            <div className="mb-4 flex gap-2">
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-8" />
                <Skeleton className="h-4 w-8" />
              </div>
              <Skeleton className="h-2 w-full" />
            </div>
          </div>
          <div className="p-4 pt-0">
            <Skeleton className="h-9 w-full" />
          </div>
        </div>
      ))}
    </div>
  )
}

