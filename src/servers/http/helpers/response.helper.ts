import { Response } from 'express';
import HttpStatusCode from '@/servers/http/enums/http-status-code-enum';

export class ApiErrorResponse {
  code: number;
  message: string;
  errors?: Record<string, any>;

  constructor(code: number, message: string, errors?: Record<string, any>) {
    this.code = code;
    this.message = message;
    this.errors = errors;
  }
}

export class UnauthorizedError extends ApiErrorResponse {
  constructor(message: string) {
    super(HttpStatusCode.Unauthorized, message);
  }
}

export class BadRequestError extends ApiErrorResponse {
  constructor(message: string, errors?: Record<string, any>) {
    super(HttpStatusCode.BadRequest, message, errors);
  }
}

export class UnprocessableEntityError extends ApiErrorResponse {
  constructor(message: string, errors?: Record<string, any>) {
    super(HttpStatusCode.Unprocessable_Entity, message, errors);
  }
}

export class InternalServerError extends ApiErrorResponse {
  constructor() {
    super(HttpStatusCode.InternalServerError, 'Internal Server Error');
  }
}

class ResponseHelper {
  static success(response: Response, message: string, data: Record<string, any>) {
    return this.successResponse(HttpStatusCode.Ok)(response, message, data);
  }

  static created(response: Response, message: string, data: Record<string, any>) {
    return this.successResponse(HttpStatusCode.Created)(response, message, data);
  }

  private static successResponse(code: number) {
    return (response: Response, message: string, data: Record<string, any>) => {
      const body = { success: true, message, data };
      response.status(code).json(body);
    };
  }
}

export default ResponseHelper;
