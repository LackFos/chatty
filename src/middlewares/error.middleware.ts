import { Request, Response } from 'express';

import { ApiErrorResponse } from '@/servers/http/helpers/response.helper';

const errorMiddleware = (error: Error, request: Request, response: Response) => {
  if (error instanceof ApiErrorResponse) {
    return response.status(error.code).json({
      success: false,
      message: error.message,
      errors: error.errors,
    });
  }
};

export default errorMiddleware;
