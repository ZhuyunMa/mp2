import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchPokemonByName } from "../services/api";
import { Pokemon } from "../types";
import { useSelection } from "../store/SelectionContext";

function art(p: Pokemon | null) {
  return p?.sprites.other?.["official-artwork"]?.front_default || p?.sprites.front_default || "";
}

export default function DetailView() {
  const { name = "" } = useParams();
  const nav = useNavigate();
  const [p, setP] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtain the current sorted order and index from the context
  const { orderedNames, currentIndex, setCurrentIndex } = useSelection();

useEffect(() => {
  let alive = true;
  (async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchPokemonByName(name);
      if (!alive) return;
      setP(data);

      // Synchronize the current index
      const idx = orderedNames.indexOf(data.name);
      if (idx >= 0) setCurrentIndex(idx);
    } catch (e: any) {
      if (!alive) return;
      setError(e?.message ?? "Failed to load details.");
    } finally {
      if (alive) setLoading(false);
    }
  })();
  return () => { alive = false; };
}, [name, orderedNames, setCurrentIndex]);



  const prevName = useMemo(() => {
    if (orderedNames.length === 0 || currentIndex <= 0) return null;
    return orderedNames[currentIndex - 1];
  }, [orderedNames, currentIndex]);

  const nextName = useMemo(() => {
    if (orderedNames.length === 0 || currentIndex < 0 || currentIndex >= orderedNames.length - 1) return null;
    return orderedNames[currentIndex + 1];
  }, [orderedNames, currentIndex]);

  if (loading) return <p className="pad">Loading…</p>;
  if (error)   return <p className="pad">Error: {error}</p>;
  if (!p)      return <p className="pad">Not found.</p>;

  return (
    <div className="container">
      <div className="detail">
        <img className="detail-art" src={art(p)} alt={p.name} />
        <div className="detail-body">
          <h2>#{p.id} {p.name}</h2>
          <p><strong>Types:</strong> {p.types.map(t => t.type.name).join(" / ")}</p>
          <p><strong>Height:</strong> {p.height} &nbsp; <strong>Weight:</strong> {p.weight}</p>
          <p><strong>Base EXP:</strong> {p.base_experience}</p>
          <p><strong>Abilities:</strong> {p.abilities.map(a => a.ability.name).join(", ")}</p>
          <div className="detail-nav">
          <button className="btn" disabled={!prevName} onClick={() => prevName && nav(`/pokemon/${prevName}`)}>← Prev</button>
          <button className="btn btn--ghost" onClick={() => nav(-1)}>Back</button>
          <button className="btn" disabled={!nextName} onClick={() => nextName && nav(`/pokemon/${nextName}`)}>Next →</button>
          </div>


        </div>
      </div>
    </div>
  );
}

