"use client";

import { useState } from "react";
import Image from "next/image";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Progress } from "../components/ui/progress";
import { Info } from "lucide-react";

const typeColors = {
  normal: "bg-stone-400 hover:bg-stone-500",
  fire: "bg-orange-500 hover:bg-orange-600",
  water: "bg-blue-500 hover:bg-blue-600",
  grass: "bg-green-500 hover:bg-green-600",
  electric: "bg-yellow-400 hover:bg-yellow-500",
  ice: "bg-cyan-300 hover:bg-cyan-400",
  fighting: "bg-red-600 hover:bg-red-700",
  poison: "bg-purple-500 hover:bg-purple-600",
  ground: "bg-amber-600 hover:bg-amber-700",
  flying: "bg-indigo-300 hover:bg-indigo-400",
  psychic: "bg-pink-500 hover:bg-pink-600",
  bug: "bg-lime-500 hover:bg-lime-600",
  rock: "bg-yellow-600 hover:bg-yellow-700",
  ghost: "bg-violet-500 hover:bg-violet-600",
  dragon: "bg-indigo-600 hover:bg-indigo-700",
  dark: "bg-stone-700 hover:bg-stone-800",
  steel: "bg-slate-400 hover:bg-slate-500",
  fairy: "bg-pink-300 hover:bg-pink-400",
};

export function PokemonCard({ pokemon }) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const imageUrl =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default;

  const formattedId = `#${String(pokemon.id).padStart(3, "0")}`;

  return (
    <>
      <Card className="overflow-hidden transition-all hover:shadow-2xl bg-white">
        <CardHeader className="p-0">
          <div className="relative h-48 w-full bg-muted/50">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={pokemon.name}
              fill
              className="object-contain p-2"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={pokemon.id <= 12} // Prioritize loading for first 12 Pokemon
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h2 className="text-xl font-bold capitalize">{pokemon.name}</h2>
            <span className="text-sm font-medium text-muted-foreground">
              {formattedId}
            </span>
          </div>
          <div className="mb-4 flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <Badge
                key={type.type.name}
                className={`capitalize ${typeColors[type.type.name] || "bg-gray-500 hover:bg-gray-600"}`}
              >
                {type.type.name}
              </Badge>
            ))}
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>HP</span>
              <span className="font-medium">
                {pokemon.stats.find((stat) => stat.stat.name === "hp")
                  ?.base_stat || 0}
              </span>
            </div>
            <Progress
              value={
                pokemon.stats.find((stat) => stat.stat.name === "hp")
                  ?.base_stat || 0
              }
              max={255}
              className="h-2"
            />
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsDetailsOpen(true)}
          >
            <Info className="mr-2 h-4 w-4" />
            View Details
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[425px] h-[700px] bg-white overflow-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span className="capitalize">{pokemon.name}</span>
              {/* <span className="text-sm font-medium text-muted-foreground">{formattedId}</span> */}
            </DialogTitle>
            <DialogDescription>
              <div className="relative h-32 w-full my-2">
                <Image
                  src={imageUrl || "/placeholder.svg"}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 425px) 100vw"
                />
              </div>
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap gap-2 mb-4">
            {pokemon.types.map((type) => (
              <Badge
                key={type.type.name}
                className={`capitalize ${typeColors[type.type.name] || "bg-gray-500 hover:bg-gray-600"}`}
              >
                {type.type.name}
              </Badge>
            ))}
          </div>

          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground text-md font-bold">
                  Height
                </p>
                <p className="font-medium">{pokemon.height / 10} m</p>
              </div>
              <div>
                <p className="text-muted-foreground text-md font-bold">
                  Weight
                </p>
                <p className="font-medium">{pokemon.weight / 10} kg</p>
              </div>
              <div>
                <p className="text-muted-foreground text-md font-bold">
                  Base Experience
                </p>
                <p className="font-medium">{pokemon.base_experience}</p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-md font-bold">Stats</h3>
              {pokemon.stats.map((stat) => (
                <div key={stat.stat.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="capitalize text-md font-bold">
                      {stat.stat.name.replace("-", " ")}
                    </span>
                    <span className="font-medium">{stat.base_stat}</span>
                  </div>
                  <Progress value={stat.base_stat} max={255} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
