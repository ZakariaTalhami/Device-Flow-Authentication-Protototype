import { Request, Response, NextFunction } from "express";
import { HttpErrors } from "../error";
import { TokenDecodedPayload } from "../inferfaces";
import { decodeAccessToken, extractTokenTypeFromId } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      tokenPayload?: TokenDecodedPayload
    }
  }
}

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.token) {
    throw new HttpErrors.HttpUnauthorizedError("Unauthorized: Bearer token missing");
  }

  try {
    const decodedPayload = decodeAccessToken(req.token);
    const tokenType = extractTokenTypeFromId(decodedPayload.id);

    req.tokenPayload = {
      id: decodedPayload.id,
      iat: decodedPayload.iat,
      exp: decodedPayload.exp,
      entityType: tokenType,
    };
  } catch (error) {
    const err = error as Error;
    throw new HttpErrors.HttpUnauthorizedError("Unauthorised: " + err.message);
  }

  next();
};
