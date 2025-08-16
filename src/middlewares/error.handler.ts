import { NextFunction, Request, Response } from 'express';

import { ApiErrorResponse } from '@/servers/http/helpers/response.helper';

export function errorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
  if (error instanceof ApiErrorResponse) {
    return response.status(error.code).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
  }
}
