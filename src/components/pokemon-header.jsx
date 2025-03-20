import { ThemeToggle } from "@/components/theme-toggle";
import PokeMonLogo from "../../public/images/poke.png";
import Image from "next/image";

export function PokemonHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-black/80 backdrop-blur  text-white supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="relative size-8 rounded-full bg-primary/10 p-1">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20">
              
            </div>
            <div className="absolute inset-0 h-8 w-8 rounded-full bg-black/80">
            <Image
                src={PokeMonLogo}
                width={100}
                height={100}
                className="h-8 w-8 rounded-full"
              />
            </div>
          </div>
          <h1 className="text-xl font-bold tracking-tight">PokéExplorer Pro</h1>
        </div>
      </div>
    </header>
  );
}
