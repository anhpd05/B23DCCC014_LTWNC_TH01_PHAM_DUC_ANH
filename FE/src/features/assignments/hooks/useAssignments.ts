import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  deleteAssignment,
  fetchAssignments,
  selectCounts,
  selectFilter,
  selectMeta,
  selectMutatingIds,
  selectVisibleAssignments,
  setFilter as setFilterAction,
  updateAssignment,
  type AssignmentsStatus,
} from "../assignmentsSlice";
import type { Assignment, FilterStatus } from "../types";

/** Khai báo tường minh — không suy ngược từ `ReturnType<typeof useAssignments>`. */
export interface AssignmentsFacade {
  items: Assignment[];
  counts: Record<FilterStatus, number>;
  filter: FilterStatus;
  status: AssignmentsStatus;
  error: string | null;
  mutating: string[];
  setFilter: (f: FilterStatus) => void;
  toggle: (a: Assignment) => void;
  remove: (id: string) => void;
  retry: () => void;
}

export function useAssignments(): AssignmentsFacade {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectVisibleAssignments);
  const counts = useAppSelector(selectCounts);
  const filter = useAppSelector(selectFilter);
  const mutating = useAppSelector(selectMutatingIds);
  const { status, error } = useAppSelector(selectMeta);

  useEffect(() => {
    if (status === "idle") void dispatch(fetchAssignments());
  }, [status, dispatch]);

  return {
    items,
    counts,
    filter,
    status,
    error,
    mutating,
    setFilter: (f: FilterStatus) => dispatch(setFilterAction(f)),
    toggle: (a: Assignment) =>
      dispatch(
        updateAssignment({ id: a.id, changes: { completed: !a.completed } }),
      ),
    remove: (id: string) => dispatch(deleteAssignment(id)),
    retry: () => dispatch(fetchAssignments()),
  };
}
