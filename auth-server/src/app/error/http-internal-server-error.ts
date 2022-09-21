import { HttpError } from "./http-error";

export class HttpInternalServerError extends HttpError {
  constructor(message: string) {
    super(500, message);
  }
}
