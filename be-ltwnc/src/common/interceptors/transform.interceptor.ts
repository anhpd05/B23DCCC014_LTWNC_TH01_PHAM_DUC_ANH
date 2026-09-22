import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs';
import type { IResponseBE } from '../types/api-response';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponseBE<T>>
{
  intercept(
    _ctx: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<IResponseBE<T>> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
        message: 'OK',
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
