export * from "./device-token-error";

import { HttpUnauthorizedError } from "./http-unauthorized-error";
import { HttpNotFoundError } from "./http-not-found-error";
import { HttpBadRequestError } from "./http-bad-request-error";
import { HttpInternalServerError } from "./http-internal-server-error";
import { HttpForbiddenError } from "./http-forbidden-error";
import { HttpValidationError } from "./http-validation-error";

export const HttpErrors = {
  HttpUnauthorizedError,
  HttpNotFoundError,
  HttpBadRequestError,
  HttpInternalServerError,
  HttpForbiddenError,
  HttpValidationError
} as const;
