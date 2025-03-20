"use client"

import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"
import { PokemonCard } from "@/components/pokemon-card"
import { PokemonHeader } from "@/components/pokemon-header"
import { FilterBar } from "@/components/filter-bar"
import { LoadingSkeleton } from "@/components/loading-skeleton"
import { EmptyState } from "@/components/empty-state"
import { ErrorDisplay } from "@/components/error-display"
import { Pagination } from "@/components/pagination"

export default function Home() {
  const [pokemonList, setPokemonList] = useState([])
  const [filteredPokemon, setFilteredPokemon] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState("")
  const [typeFilter, setTypeFilter] = useState("")
  const [sortBy, setSortBy] = useState("")
  
  // // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(12)
  
  const debouncedSearch = useDebounce(search, 300)

  useEffect(() => {
    async function fetchPokemon() {
      try {
        setIsLoading(true)
        setError(null)
        
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
        const data = await response.json()
        
        const detailedPokemon = await Promise.all(
          data.results.map(async (pokemon) => {
            const details = await fetch(pokemon.url)
            return details.json()
          })
        )
        
        setPokemonList(detailedPokemon)
        setFilteredPokemon(detailedPokemon)
      } catch (error) {
        console.error("Error fetching Pokémon:", error)
        setError("Failed to load Pokémon data. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPokemon()
  }, [])

  // Apply filters and sorting whenever dependencies change
  useEffect(() => {
    if (!pokemonList.length) return
    
    let result = [...pokemonList]
    
    // Apply search filter
    if (debouncedSearch) {
      result = result.filter(pokemon => 
        pokemon.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    }
    
    // Apply type filter
    if (typeFilter && typeFilter !== "all") {
      result = result.filter(pokemon => 
        pokemon.types.some(t => t.type.name === typeFilter)
      )
    }
    
    // Apply sorting
    if (sortBy) {
      result = result.sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name)
        if (sortBy === "id") return a.id - b.id
        if (sortBy === "base_experience") return b.base_experience - a.base_experience
        return 0
      })
    }
    
    setFilteredPokemon(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [pokemonList, debouncedSearch, typeFilter, sortBy])

  // Get all unique types from the Pokemon list
  const pokemonTypes = Array.from(
    new Set(
      pokemonList.flatMap(pokemon => 
        pokemon.types.map(type => type.type.name)
      )
    )
  ).sort()
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredPokemon.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredPokemon.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50">
       <PokemonHeader />
      
      <main className=" !bg-black/5 md:mx-20 px-4 py-8">
        <FilterBar 
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          pokemonTypes={pokemonTypes}
        />
        
        {isLoading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : filteredPokemon.length === 0 ? (
          <EmptyState search={debouncedSearch} typeFilter={typeFilter} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
              {currentItems.map((pokemon) => (
                <PokemonCard key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
            
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              totalItems={filteredPokemon.length}
              itemsPerPage={itemsPerPage}
            />
          </>
        )}
      </main> 
    </div>
  )
}
