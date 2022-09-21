import { HttpUnauthorizedError } from "./http-unauthorized-error";
import { HttpNotFoundError } from "./http-not-found-error";
import { HttpBadRequestError } from "./http-bad-request-error";
import { HttpInternalServerError } from "./http-internal-server-error";
import { HttpForbiddenError } from "./http-forbidden-error";

export const HttpErrors = {
  HttpUnauthorizedError,
  HttpNotFoundError,
  HttpBadRequestError,
  HttpInternalServerError,
  HttpForbiddenError,
} as const;
