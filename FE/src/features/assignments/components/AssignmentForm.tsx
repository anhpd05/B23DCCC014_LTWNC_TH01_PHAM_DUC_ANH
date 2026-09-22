import {
  AlertCircle,
  BookOpen,
  CalendarDays,
  FileText,
  Plus,
  SlidersHorizontal,
} from "lucide-react";
import { useAppDispatch } from "../../../app/hooks";
import { useForm } from "../../../shared/hooks/useForm";
import { createAssignment } from "../assignmentsSlice";
import { PRIORITIES, PRIORITY_LABEL, type NewAssignmentDto } from "../types";
import { isPriority } from "../guards";

const toIsoEndOfDay = (yyyyMmDd: string) =>
  new Date(`${yyyyMmDd}T23:59:59`).toISOString();

export function AssignmentForm() {
  const dispatch = useAppDispatch();
  const form = useForm<NewAssignmentDto>(
    { subject: "", title: "", dueDate: "", priority: "medium" },
    {
      subject: (v) => (v.trim() ? undefined : "Nhập môn học"),
      title: (v) => (v.trim() ? undefined : "Nhập tên bài tập"),
      dueDate: (v) => (v ? undefined : "Chọn hạn nộp"),
    },
  );

  const errSubject = form.touched.subject ? form.errors.subject : undefined;
  const errTitle = form.touched.title ? form.errors.title : undefined;
  const errDueDate = form.touched.dueDate ? form.errors.dueDate : undefined;

  return (
    <form
      className="assignment-form"
      onSubmit={form.handleSubmit(async (v) => {
        try {
          await dispatch(
            createAssignment({ ...v, dueDate: toIsoEndOfDay(v.dueDate) }),
          ).unwrap();
          form.reset();
        } catch {
          /* lỗi đã hanl ở err roi */
        }
      })}
    >
      <div className={errSubject ? "field field--invalid" : "field"}>
        <label htmlFor="subject">
          <BookOpen size={13} aria-hidden="true" />
          Môn học
        </label>
        <input
          id="subject"
          placeholder="Lập trình Web nâng cao"
          {...form.register("subject")}
        />
        {errSubject && (
          <p className="field-error">
            <AlertCircle size={13} aria-hidden="true" />
            {errSubject}
          </p>
        )}
      </div>

      <div className={errTitle ? "field field--invalid" : "field"}>
        <label htmlFor="title">
          <FileText size={13} aria-hidden="true" />
          Tên bài tập
        </label>
        <input
          id="title"
          placeholder="Bài tập thực hành 02"
          {...form.register("title")}
        />
        {errTitle && (
          <p className="field-error">
            <AlertCircle size={13} aria-hidden="true" />
            {errTitle}
          </p>
        )}
      </div>

      <div className={errDueDate ? "field field--invalid" : "field"}>
        <label htmlFor="dueDate">
          <CalendarDays size={13} aria-hidden="true" />
          Hạn nộp
        </label>
        <input id="dueDate" type="date" {...form.register("dueDate")} />
        {errDueDate && (
          <p className="field-error">
            <AlertCircle size={13} aria-hidden="true" />
            {errDueDate}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="priority">
          <SlidersHorizontal size={13} aria-hidden="true" />
          Độ ưu tiên
        </label>
        <select
          id="priority"
          name="priority"
          value={form.values.priority}
          onChange={(e) => {
            if (isPriority(e.target.value))
              form.setField("priority", e.target.value);
          }}
        >
          {PRIORITIES.map((p) => (
            <option key={p} value={p}>
              {PRIORITY_LABEL[p]}
            </option>
          ))}
        </select>
      </div>

      <div className="form__actions">
        <button type="submit" className="form__submit">
          <Plus size={17} aria-hidden="true" />
          Thêm bài tập
        </button>
      </div>
    </form>
  );
}
