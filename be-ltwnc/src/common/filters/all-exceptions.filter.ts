import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Lỗi máy chủ';
    if (exception instanceof HttpException) {
      const body = exception.getResponse();
      if (typeof body === 'string') {
        message = body;
      } else {
        const bodyMessage = (body as { message?: string | string[] }).message;
        message = Array.isArray(bodyMessage)
          ? bodyMessage.join(', ')
          : (bodyMessage ?? 'Lỗi không xác định');
      }
    }

    res.status(status).json({
      success: false,
      data: null,
      message,
      statusCode: status,
      path: req.url,
      timestamp: new Date().toISOString(),
    });
  }
}
