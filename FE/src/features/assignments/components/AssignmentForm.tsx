import { useAppDispatch } from '../../../app/hooks';
import { useForm } from '../../../shared/hooks/useForm';
import { createAssignment } from '../assignmentsSlice';
import { PRIORITIES, PRIORITY_LABEL, type NewAssignmentDto } from '../types';
import { isPriority } from '../guards';

const toIsoEndOfDay = (yyyyMmDd: string) => new Date(`${yyyyMmDd}T23:59:59`).toISOString();

export function AssignmentForm() {
  const dispatch = useAppDispatch();
  const form = useForm<NewAssignmentDto>(
    { subject: '', title: '', dueDate: '', priority: 'medium' },
    {
      subject: (v) => (v.trim() ? undefined : 'Nhập môn học'),
      title: (v) => (v.trim() ? undefined : 'Nhập tên bài tập'),
      dueDate: (v) => (v ? undefined : 'Chọn hạn nộp'),
    },
  );

  return (
    <form
      className="assignment-form"
      onSubmit={form.handleSubmit(async (v) => {
        try {
          await dispatch(createAssignment({ ...v, dueDate: toIsoEndOfDay(v.dueDate) })).unwrap();
          form.reset();
        } catch {
          /* lỗi đã nằm trong state.error */
        }
      })}
    >
      <div className="field">
        <label htmlFor="subject">Môn học</label>
        <input id="subject" {...form.register('subject')} />
        {form.touched.subject && form.errors.subject && (
          <p className="field-error">{form.errors.subject}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="title">Tên bài tập</label>
        <input id="title" {...form.register('title')} />
        {form.touched.title && form.errors.title && (
          <p className="field-error">{form.errors.title}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="dueDate">Hạn nộp</label>
        <input id="dueDate" type="date" {...form.register('dueDate')} />
        {form.touched.dueDate && form.errors.dueDate && (
          <p className="field-error">{form.errors.dueDate}</p>
        )}
      </div>

      <div className="field">
        <label htmlFor="priority">Độ ưu tiên</label>
        <select
          id="priority"
          name="priority"
          value={form.values.priority}
          onChange={(e) => {
            if (isPriority(e.target.value)) form.setField('priority', e.target.value);
          }}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {PRIORITY_LABEL[p]}
            </option>
          ))}
        </select>
      </div>

      <button type="submit">Thêm bài tập</button>
    </form>
  );
}
