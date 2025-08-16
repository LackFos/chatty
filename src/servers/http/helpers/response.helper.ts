import { Response } from "express";
import StatusCode from "@/http/enums/http.status.code";

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
    super(StatusCode.Unauthorized, message);
  }
}

export class UnprocessableEntityError extends ApiErrorResponse {
  constructor(message: string, errors?: Record<string, any>) {
    super(StatusCode.Unprocessable_Entity, message, errors);
  }
}

export class InternalServerError extends ApiErrorResponse {
  constructor() {
    super(StatusCode.InternalServerError, "Internal Server Error");
  }
}

class ResponseHelper {
  static success(response: Response, message: string, data: Record<string, any>) {
    return this.successResponse(StatusCode.Ok)(response, message, data);
  }

  static created(response: Response, message: string, data: Record<string, any>) {
    return this.successResponse(StatusCode.Created)(response, message, data);
  }

  private static successResponse(code: number) {
    return (response: Response, message: string, data: Record<string, any>) => {
      const body = { success: true, message, data };
      response.status(code).json(body);
    };
  }
}

export default ResponseHelper;
