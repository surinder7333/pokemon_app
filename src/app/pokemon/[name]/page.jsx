import axios from "axios";

async function getPokemonDetails(name) {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching Pokémon details:", error);
    return null;
  }
}

export default async function PokemonDetails({ params }) {
  const pokemon = await getPokemonDetails(params.name);

  if (!pokemon) {
    return <p className="text-red-500">Pokémon not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="w-64 h-64"
      />
      <p className="mt-4">
        <strong>Type:</strong>{" "}
        {pokemon.types.map((t) => t.type.name).join(", ")}
      </p>
      <p>
        <strong>Abilities:</strong>{" "}
        {pokemon.abilities.map((a) => a.ability.name).join(", ")}
      </p>
      <h2 className="mt-4 text-xl font-semibold">Stats:</h2>
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
    </div>
  );
}
