import type { PropsWithChildren } from 'react';
import { createSafeContext } from '../../../shared/createSafeContext';
import { useAssignments } from '../hooks/useAssignments';
import { AssignmentItem } from './AssignmentItem';
import { FILTERS, FILTER_LABEL } from '../types';

type ListContextValue = ReturnType<typeof useAssignments>;

const [ListProvider, useListContext] = createSafeContext<ListContextValue>('AssignmentList');

function AssignmentList({ children }: PropsWithChildren) {
  const ctx = useAssignments();

  if (ctx.status === 'loading' || ctx.status === 'idle') return <p>Đang tải…</p>;
  if (ctx.status === 'failed') {
    return (
      <div role="alert">
        <p>{ctx.error}</p>
        <button onClick={ctx.retry}>Thử lại</button>
      </div>
    );
  }

  return (
    <ListProvider value={ctx}>
      <section className="list">{children}</section>
    </ListProvider>
  );
}

function Filters() {
  const { filter, setFilter, counts } = useListContext();
  return (
    <nav className="filters">
      {FILTERS.map((f) => (
        <button key={f} type="button" aria-pressed={f === filter} onClick={() => setFilter(f)}>
          {FILTER_LABEL[f]} ({counts[f]})
        </button>
      ))}
    </nav>
  );
}

function Items() {
  const { items, toggle, remove, mutating } = useListContext();
  if (items.length === 0) return null;
  return (
    <ul>
      {items.map((a) => (
        <AssignmentItem
          key={a.id}
          data={a}
          busy={mutating.includes(a.id)}
          onToggle={toggle}
          onRemove={remove}
        />
      ))}
    </ul>
  );
}

function Empty({ children }: PropsWithChildren) {
  const { items } = useListContext();
  return items.length === 0 ? <p className="empty">{children}</p> : null;
}

AssignmentList.Filters = Filters;
AssignmentList.Items = Items;
AssignmentList.Empty = Empty;

export { AssignmentList };
