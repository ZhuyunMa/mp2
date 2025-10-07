import { Pokemon } from "../types";
import { Link } from "react-router-dom";
import TypeBadge from "./TypeBadge";

function art(p: Pokemon) {
  return p.sprites.other?.["official-artwork"]?.front_default || p.sprites.front_default || "";
}

export default function PokemonCard({ p }: { p: Pokemon }) {
  return (
    <Link to={`/pokemon/${p.name}`} className="card">
      <div className="card-media">
        <img src={art(p)} alt={p.name} />
      </div>
      <div className="card-body">
        <h3 className={`title title--${p.types[0].type.name}`}>
            <span className="muted">#{p.id}</span> {p.name}
        </h3>

        <div className="badge-row">
          {p.types.map(t => (
            <TypeBadge key={t.type.name} type={t.type.name} />
          ))}
        </div>
      </div>
    </Link>
  );
}
