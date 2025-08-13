import { Response } from "express";
import StatusCode from "@/enums/http.status.code";

class ResponseHelper {
  static success( 
    response: Response,
    message: string,
    data: Record<string, any>
  ) {
    return this.successResponse(StatusCode.Ok)(response, message, data);
  }

  static created(
    response: Response,
    message: string,
    data: Record<string, any>
  ) {
    return this.successResponse(StatusCode.Created)(response, message, data);
  }

  static unauthorized(
    response: Response,
    message: string,
  ) {
      return this.failedResponse(StatusCode.Unauthorized)(response, message);
  }

  static unprocessableEntity(
    response: Response,
    message: string,
    errors?: Record<string, any>
  ) {
    return this.failedResponse(StatusCode.Unprocessable_Entity)(response, message, errors);
  }

  static internalServerError(
    response: Response,
    message: string,
  ) {
    return this.failedResponse(StatusCode.Unprocessable_Entity)(response, message);
  }

  private static successResponse(code: number) {
    return (
      response: Response,
      message: string,
      data: Record<string, any>
    ) => {
      const body = { success: true, message, data };
      response.status(code).json(body);
    };
  }

  private static failedResponse(code: number) {
    return (
      response: Response,
      message: string,
      errors?: Record<string, any>) => {
      const body = { success: false, message, errors };
      response.status(code).json(body);
    };
  }
}

export default ResponseHelper;
