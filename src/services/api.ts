
import axios from "axios";
import { Pokemon, PokemonListItem } from "../types";

const api = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
  timeout: 12000,
});

// Simple caching, reducing throttling
const cache = new Map<string, any>();
async function get<T>(url: string): Promise<T> {
  if (cache.has(url)) return cache.get(url);
  const { data } = await api.get<T>(url);
  cache.set(url, data);
  return data;
}

export async function fetchPokemonList(limit = 151, offset = 0) {
  return get<{ results: PokemonListItem[] }>(`/pokemon?limit=${limit}&offset=${offset}`);
}

export async function fetchPokemonByName(name: string) {
  return get<Pokemon>(`/pokemon/${name.toLowerCase()}`);
}

export async function fetchManyPokemon(names: string[]) {
  return Promise.all(names.map((n) => fetchPokemonByName(n)));
}
