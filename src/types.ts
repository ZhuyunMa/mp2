export type NamedAPIResource = { name: string; url: string };
export type PokemonListItem = NamedAPIResource;

export type PokemonType = { slot: number; type: NamedAPIResource };
export type PokemonAbility = { is_hidden: boolean; slot: number; ability: NamedAPIResource };
export type PokemonSprites = {
  front_default: string | null;
  other?: { "official-artwork"?: { front_default: string | null } };
};

export type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
};

export type SortKey = "name" | "id" | "base_experience";
export type SortOrder = "asc" | "desc";

