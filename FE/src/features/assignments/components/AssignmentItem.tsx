import { useCountdown } from '../../../shared/hooks/useCountdown';
import { PRIORITY_LABEL, type Assignment } from '../types';

interface AssignmentItemProps {
  data: Assignment;
  busy: boolean;
  onToggle: (a: Assignment) => void;
  onRemove: (id: string) => void;
}

export function AssignmentItem({ data, busy, onToggle, onRemove }: AssignmentItemProps) {
  const countdown = useCountdown(data.dueDate);

  return (
    <li className={`assignment-item${busy ? ' assignment-item--busy' : ''}`}>
      <input
        type="checkbox"
        checked={data.completed}
        disabled={busy}
        onChange={() => onToggle(data)}
        aria-label={`Đánh dấu hoàn thành ${data.title}`}
      />
      <div className="assignment-item__body">
        <p className="assignment-item__subject">{data.subject}</p>
        <p
          className={
            data.completed
              ? 'assignment-item__title assignment-item__title--done'
              : 'assignment-item__title'
          }
        >
          {data.completed ? '✓ ' : ''}
          {data.title}
        </p>
        <p className="assignment-item__due">
          Hạn: {new Date(data.dueDate).toLocaleDateString('vi-VN')}
          {!data.completed && (
            <span className={`countdown countdown--${countdown.tone}`}> · {countdown.label}</span>
          )}
        </p>
      </div>
      <span className={`badge badge--${data.priority}`}>{PRIORITY_LABEL[data.priority]}</span>
      <button type="button" disabled={busy} onClick={() => onRemove(data.id)}>
        Xoá
      </button>
    </li>
  );
}
