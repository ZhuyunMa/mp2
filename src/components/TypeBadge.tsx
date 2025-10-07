type Props = { type: string };

export default function TypeBadge({ type }: Props) {
  // uniform lowercase
  const t = type.toLowerCase();
  return <span className={`badge badge--${t}`}>{t}</span>;
}
