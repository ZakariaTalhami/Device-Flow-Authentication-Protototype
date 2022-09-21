import { HttpError } from "./http-error";

export class HttpBadRequestError extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}
