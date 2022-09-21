import { HttpError } from "./http-error";

export class HttpUnauthorizedError extends HttpError {
  statusMessage = "Unauthorized";
  
  constructor(message: string = "Unauthorized") {
    super(401, message);
  }
}
