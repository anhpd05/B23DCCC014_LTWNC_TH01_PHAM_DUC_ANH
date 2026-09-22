import axios, { AxiosError } from 'axios';
import type { IResponseBE } from './types';
import { ApiError } from './ApiError';

declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    metadata?: { requestId: string; startedAt: number };
  }
}

export const http = axios.create({
  baseURL: '/api',
  timeout: 10_000,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use(
  (config) => {
    config.metadata = { requestId: crypto.randomUUID(), startedAt: performance.now() };
    config.headers.set('X-Request-Id', config.metadata.requestId);
    return config;
  },
  null,
  { synchronous: true },
);

function toApiError(error: unknown): ApiError {
  if (axios.isAxiosError<IResponseBE<null>>(error)) {
    if (error.response) {
      return new ApiError(
        error.response.status,
        error.response.data?.message ?? `Máy chủ trả về ${error.response.status}`,
        'HTTP',
      );
    }
    switch (error.code) {
      case AxiosError.ECONNABORTED:
      case AxiosError.ETIMEDOUT:
        return new ApiError(0, 'Máy chủ phản hồi quá chậm', 'TIMEOUT');
      case AxiosError.ERR_NETWORK:
        return new ApiError(0, 'Không kết nối được máy chủ — backend đã chạy chưa?', 'NETWORK');
      default:
        return new ApiError(0, error.message, 'UNKNOWN');
    }
  }
  return new ApiError(0, error instanceof Error ? error.message : 'Lỗi không xác định', 'UNKNOWN');
}

http.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV && response.config.metadata) {
      const ms = Math.round(performance.now() - response.config.metadata.startedAt);
      console.debug(
        `[api] ${response.config.method?.toUpperCase()} ${response.config.url} ${response.status} ${ms}ms`,
      );
    }
    return response;
  },
  (error: unknown) => Promise.reject(toApiError(error)),
);
