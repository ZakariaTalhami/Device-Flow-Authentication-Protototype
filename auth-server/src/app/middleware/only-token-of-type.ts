import { NextFunction, Request, Response } from "express";
import { TokenType } from "../enum/token-type";
import { HttpErrors } from "../error";

export const onlyTokenOfType = (...args: TokenType[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.tokenPayload) {
      throw new HttpErrors.HttpUnauthorizedError("Unauthenticate");
    }

    if (!args.includes(req.tokenPayload.entityType)) {
      throw new HttpErrors.HttpForbiddenError(
        `Forbidden: entity type of [${
          req.tokenPayload.entityType
        }] is not authorized, must be of type [${args.join(", ")}]`
      );
    }

    next();
  };
};

export const onlyTokenOfTypeUser = onlyTokenOfType(TokenType.USER);
export const onlyTokenOfTypeDevice = onlyTokenOfType(TokenType.DEVICE);
