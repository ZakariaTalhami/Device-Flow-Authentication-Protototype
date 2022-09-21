import { HttpError } from "./http-error";

export class HttpForbiddenError extends HttpError {
  statusMessage = "Forbidden";

  constructor(message: string = "Forbidden") {
    super(403, message);
  }
}
