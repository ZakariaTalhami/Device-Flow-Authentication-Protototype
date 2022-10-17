import { Request, Response, Router } from "express";
import { HttpErrors } from "../error";
import { httpResponse } from "../utils/httpResponse";
import { userService } from "../services/user";
import { DEVICE_MODEL_PREFIX, USER_MODEL_PREFIX } from "../constants";
import { TokenValidationResponse } from "../inferfaces";
import { deviceService } from "../services/device";
import { getReadableIdType } from "../utils/jwt";

const router = Router();

router.post("/token/validate", async (req: Request, res: Response) => {
  const payload = req.tokenPayload;
  if (!payload) {
    throw new HttpErrors.HttpBadRequestError("Bearer authorization header not set");
  }

  let response: TokenValidationResponse;
  try {
    const id: string = payload.id;
    const prefix = id.substring(0, 4);
    switch (prefix) {
      case USER_MODEL_PREFIX:
        const user = await userService.findUserById(id);
        response = {
          ...payload,
          readableEntityType: getReadableIdType(payload.entityType),
          data: user,
        };
        break;
      case DEVICE_MODEL_PREFIX:
        const device = await deviceService.findDeviceById(id);
        response = {
          ...payload,
          readableEntityType: getReadableIdType(payload.entityType),
          data: device,
        };
        break;

      default:
        throw new Error(`Unsupported token id: ${prefix}`);
    }
  } catch (error) {
    const err = error as Error;
    throw new HttpErrors.HttpUnauthorizedError(`Invalid Token: ${err?.message}`);
  }

  httpResponse.ok(res, response, "Authorized");
});

export { router as validateTokenRouter };
