export interface IResponseBE<T> {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
}

export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'succeeded'; data: T }
  | { status: 'failed'; error: string };
