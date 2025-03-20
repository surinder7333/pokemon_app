"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Search, SlidersHorizontal, X } from "lucide-react"

export function FilterBar({ search, setSearch, typeFilter, setTypeFilter, sortBy, setSortBy, pokemonTypes }) {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)

  const clearFilters = () => {
    setSearch("")
    setTypeFilter("")
    setSortBy("")
  }

  const hasActiveFilters = search || typeFilter || sortBy

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 bg-white">
          <Search className="absolute left-3 !bg-white top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search Pokémon..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
              onClick={() => setSearch("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Desktop Filters */}
        <div className="hidden sm:flex gap-4">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px] !bg-white">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="bg-white z-10">
              <SelectItem value="all">All Types</SelectItem>
              {pokemonTypes.map((type) => (
                <SelectItem key={type} value={type} className="capitalize">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] !bg-white">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent className="bg-white z-10">
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="name">Name (A-Z)</SelectItem>
              <SelectItem value="id">ID (Lowest)</SelectItem>
              <SelectItem value="base_experience">Experience (Highest)</SelectItem>
            </SelectContent>
          </Select>

          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters} size="icon">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Mobile Filters Button */}
        <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
          <SheetTrigger asChild className="bg-white">
            <Button variant="outline" className="sm:hidden">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {hasActiveFilters && <span className="ml-1 flex h-2 w-2 rounded-full bg-primary"></span>}
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] bg-white">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your Pokémon search results</SheetDescription>
            </SheetHeader>
            <div className="space-y-6 py-6 bg-white">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Type</h3>
                <Select
                  value={typeFilter}
                  onValueChange={(value) => {
                    setTypeFilter(value)
                  }}
                >
                  <SelectTrigger className="!bg-white !z-10">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger >
                  <SelectContent className="bg-gray-100">
                    <SelectItem value="all">All Types</SelectItem>
                    {pokemonTypes.map((type) => (
                      <SelectItem key={type} value={type} className="capitalize">
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Sort By</h3>
                <Select
                  value={sortBy}
                  onValueChange={(value) => {
                    setSortBy(value)
                  }}
                >
                  <SelectTrigger className="!bg-white">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-100">
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="name">Name (A-Z)</SelectItem>
                    <SelectItem value="id">ID (Lowest)</SelectItem>
                    <SelectItem value="base_experience">Experience (Highest)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
                <Button onClick={() => setIsMobileFiltersOpen(false)}>Apply Filters</Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {search && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              Search: {search}
              <Button variant="ghost" size="icon" className="ml-1 h-3.5 w-3.5" onClick={() => setSearch("")}>
                <X className="h-2 w-2" />
              </Button>
            </div>
          )}
          {typeFilter && typeFilter !== "all" && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize">
              Type: {typeFilter}
              <Button variant="ghost" size="icon" className="ml-1 h-3.5 w-3.5" onClick={() => setTypeFilter("")}>
                <X className="h-2 w-2" />
              </Button>
            </div>
          )}
          {sortBy && sortBy !== "default" && (
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
              Sort: {sortBy === "name" ? "Name (A-Z)" : sortBy === "id" ? "ID (Lowest)" : "Experience (Highest)"}
              <Button variant="ghost" size="icon" className="ml-1 h-3.5 w-3.5" onClick={() => setSortBy("")}>
                <X className="h-2 w-2" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

