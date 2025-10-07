
type Props = { value: string; onChange: (v: string) => void };

export default function SearchBar({ value, onChange }: Props) {
  return (
    <input
      className="input"
      placeholder="Search Pokémon (filter as you type)"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
