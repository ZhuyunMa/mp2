
import { SortKey, SortOrder } from "../types";

type Props = {
  sortKey: SortKey;
  order: SortOrder;
  onChangeKey: (k: SortKey) => void;
  onChangeOrder: (o: SortOrder) => void;
};

export default function SortControls({ sortKey, order, onChangeKey, onChangeOrder }: Props) {
  return (
    <div className="controls">
      <label>
        Sort by:&nbsp;
        <select value={sortKey} onChange={(e) => onChangeKey(e.target.value as SortKey)}>
          <option value="name">Name</option>
          <option value="id">ID</option>
          <option value="base_experience">Base EXP</option>
        </select>
      </label>
      <label>
        Order:&nbsp;
        <select value={order} onChange={(e) => onChangeOrder(e.target.value as SortOrder)}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
}
