"use client"

import { SearchX } from "lucide-react"
import { Button } from "../components/ui/button"

export function EmptyState({ search, typeFilter }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="rounded-full bg-muted p-3 mb-4">
        <SearchX className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold mb-2">No Pokémon Found</h3>
      <p className="text-muted-foreground max-w-md mb-6">
        {search && typeFilter
          ? `No Pokémon matching "${search}" with type "${typeFilter}" were found.`
          : search
            ? `No Pokémon matching "${search}" were found.`
            : typeFilter
              ? `No Pokémon with type "${typeFilter}" were found.`
              : "No Pokémon match your current filters."}
      </p>
      <Button variant="outline" onClick={() => window.location.reload()}>
        Reset All Filters
      </Button>
    </div>
  )
}

