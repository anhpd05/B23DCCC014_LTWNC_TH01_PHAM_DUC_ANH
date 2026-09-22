import { PRIORITIES, type Assignment, type Priority } from './types';

export function isPriority(v: unknown): v is Priority {
  return typeof v === 'string' && (PRIORITIES as readonly string[]).includes(v);
}

export function isAssignment(v: unknown): v is Assignment {
  if (typeof v !== 'object' || v === null) return false;
  const o = v as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.subject === 'string' &&
    typeof o.title === 'string' &&
    typeof o.dueDate === 'string' &&
    !Number.isNaN(Date.parse(o.dueDate)) &&
    typeof o.completed === 'boolean' &&
    isPriority(o.priority)
  );
}

export const isAssignmentArray = (v: unknown): v is Assignment[] =>
  Array.isArray(v) && v.every(isAssignment);
