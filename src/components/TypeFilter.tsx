// src/components/TypeFilter.tsx
const ALL_TYPES = [
  "normal","fire","water","electric","grass","ice","fighting","poison","ground",
  "flying","psychic","bug","rock","ghost","dragon","dark","steel","fairy"
];

type Props = {
  selected: string[];
  onToggle: (type: string) => void;
  title?: string;
};

export default function TypeFilter({ selected, onToggle, title = "Filter by types" }: Props) {
  return (
    <div className="types">
      <span className="muted" style={{ marginRight: 8 }}>{title}:</span>
      {ALL_TYPES.map((t) => (
        <label
          key={t}
          className={`chip chip--${t} ${selected.includes(t) ? "chip--active" : ""}`}
        >
          <input
            type="checkbox"
            checked={selected.includes(t)}
            onChange={() => onToggle(t)}
          />
          {t}
        </label>
      ))}
    </div>
  );
}


