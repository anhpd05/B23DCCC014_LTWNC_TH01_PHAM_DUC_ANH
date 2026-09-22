export type ApiErrorKind = 'HTTP' | 'NETWORK' | 'TIMEOUT' | 'SCHEMA' | 'UNKNOWN';

export class ApiError extends Error {
  readonly status: number;
  readonly kind: ApiErrorKind;

  constructor(status: number, message: string, kind: ApiErrorKind) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.kind = kind;
  }
}

export const isApiError = (e: unknown): e is ApiError => e instanceof ApiError;
