import { useEffect, useMemo, useState } from "react";
import { fetchPokemonList, fetchManyPokemon } from "../services/api";
import { Pokemon } from "../types";
import PokemonCard from "../components/PokemonCard";
import TypeFilter from "../components/TypeFilter";
import { useSelection } from "../store/SelectionContext";

export default function GalleryView() {
  const [all, setAll] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const { setOrderedNames } = useSelection();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await fetchPokemonList(151, 0);
        const names = list.results.map((r: { name: string }) => r.name);
        const detailed = await fetchManyPokemon(names);
        if (!alive) return;
        setAll(detailed);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Failed to load Pokémon.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const toggle = (t: string) =>
    setTypes(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]);

  // When multiple types are selected, all must match (AND relationship)
  const filtered = useMemo(() => {
    if (types.length === 0) return all;
    return all.filter(p => {
      const ts = p.types.map(t => t.type.name);
      return types.every(t => ts.includes(t));
    });
  }, [all, types]);

  // Synchronize the sequence to the SelectionContext (for use by the detail page's Prev/Next buttons)
  useEffect(() => {
    setOrderedNames(filtered.map(p => p.name));
  }, [filtered, setOrderedNames]);

  if (loading) return <p className="pad">Loading…</p>;
  if (error)   return <p className="pad">Error: {error}</p>;

  return (
    <div className="container">
      <h1>Gallery</h1>
      <TypeFilter selected={types} onToggle={toggle} />
      <div className="grid">
        {filtered.map(p => <PokemonCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}

