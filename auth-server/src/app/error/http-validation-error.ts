import { HttpError } from "./http-error";

export class HttpValidationError extends HttpError {
  private details?: object | any[];

  constructor(message: string, details?: object | any[]) {
    super(404, message);
    this.details = details;
  }

  toJSON(): {
    statusCode: number;
    statusMessage: string | undefined;
    error: { message: string; trace: string | undefined; details: any };
  } {
    const json = super.toJSON();
    return {
      ...json,
      error: {
        message: json.error.message,
        details: this.details,
        trace: undefined,
      },
    };
  }
}
