import { Request, Response, Router } from "express";
import { HttpErrors } from "../error";
import { httpResponse } from "../utils/httpResponse";
import { decodeAccessToken } from "../utils/jwt";
import { userService } from "../services/user";

const router = Router();

const BEARER_TOKEN_START_INDEX = 7;
const extractAuthTokenFromHeaders = (req: Request): string | null => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    return authHeader.substring(BEARER_TOKEN_START_INDEX, authHeader.length);
  }

  return null;
};

router.post("/token/validate", async (req: Request, res: Response) => {
  const authToken = extractAuthTokenFromHeaders(req);
  if (!authToken) {
    throw new HttpErrors.HttpBadRequestError("Bearer authorization header not set");
  }

  let response;
  try {
    const payload = decodeAccessToken(authToken);

    const id: string = payload.id;
    switch (id.substring(0, 4)) {
      case "user":
        const user = await userService.findUserById(id);
        response = {
          entityType: "user",
          iat: payload.iat,
          exp: payload.exp,
          data: user,
        };
        break;

      default:
        break;
    }
  } catch (error) {
    const err = error as Error;
    throw new HttpErrors.HttpUnauthorizedError(`Invalid Token: ${err?.message}`);
  }

  httpResponse.ok(res, response, "Authorized");
});

export { router as validateTokenRouter };
