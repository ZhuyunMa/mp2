
import { useEffect, useMemo, useState } from "react";
import { fetchPokemonList, fetchManyPokemon } from "../services/api";
import { Pokemon, SortKey, SortOrder } from "../types";
import SearchBar from "../components/SearchBar";
import SortControls from "../components/SortControls";
import PokemonCard from "../components/PokemonCard";
import { useSelection } from "../store/SelectionContext";

export default function ListView() {
  const [raw, setRaw] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [q, setQ] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [order, setOrder] = useState<SortOrder>("asc");

  const { setOrderedNames } = useSelection();

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const list = await fetchPokemonList(151, 0);
        // Explicitly specify the type of r to avoid "implicitly has any"
        const names = list.results.map((r: { name: string }) => r.name);

        const detailed = await fetchManyPokemon(names);
        if (!alive) return;
        setRaw(detailed);
      } catch (e: any) {
        if (!alive) return;
        setError(e?.message ?? "Failed to load Pokémon.");
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return raw;
    return raw.filter(p => p.name.includes(s) || String(p.id) === s);
  }, [q, raw]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const va = (sortKey === "name" ? a.name : sortKey === "id" ? a.id : a.base_experience ?? 0);
      const vb = (sortKey === "name" ? b.name : sortKey === "id" ? b.id : b.base_experience ?? 0);
      if (va < vb) return order === "asc" ? -1 : 1;
      if (va > vb) return order === "asc" ? 1 : -1;
      return 0;
    });
    return arr;
  }, [filtered, sortKey, order]);

  // Pass the "current sorting order" to the detail page for use in Prev/Next functionality.
  useEffect(() => {
    setOrderedNames(sorted.map(p => p.name));
  }, [sorted, setOrderedNames]);

  if (loading) return <p className="pad">Loading…</p>;
  if (error)   return <p className="pad">Error: {error}</p>;

  return (
    <div className="container">
      <h1>Pokémon List</h1>
      <div className="toolbar">
        <SearchBar value={q} onChange={setQ} />
        <SortControls sortKey={sortKey} order={order} onChangeKey={setSortKey} onChangeOrder={setOrder} />
      </div>
      <div className="grid">
        {sorted.map(p => <PokemonCard key={p.id} p={p} />)}
      </div>
    </div>
  );
}
