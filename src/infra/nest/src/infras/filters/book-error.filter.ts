import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { InvalidPhoneNumberException } from '../../domaine/errors/book.error';

@Catch()
export class BookErrorFilter implements ExceptionFilter {
  catch(exception: InvalidPhoneNumberException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : exception.statusCode;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      name: exception.name,
      message: exception.message,
      path: request.url,
    });
  }
}
