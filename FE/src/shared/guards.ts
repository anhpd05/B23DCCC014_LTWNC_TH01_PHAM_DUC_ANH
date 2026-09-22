import type { IResponseBE } from './types';

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null;
}

export function isEnvelope<T>(
  v: unknown,
  guard: (x: unknown) => x is T,
): v is IResponseBE<T> {
  if (!isRecord(v)) return false;
  return (
    typeof v.success === 'boolean' &&
    typeof v.message === 'string' &&
    typeof v.timestamp === 'string' &&
    guard(v.data)
  );
}
