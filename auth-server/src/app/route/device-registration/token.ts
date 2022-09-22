import { Response, Router, Request, response } from "express";
import { body } from "express-validator";
import { DeviceTokenError } from "../../error";
import { validateRequest } from "../../middleware";
import { registrationProcessService } from "../../services/registration-process-service";

const router = Router();

router.post(
  "/token",
  [
    body("client_id", "clientId is required").isString().notEmpty(),
    body("device_code", "clientId is required").isString().notEmpty(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { client_id: clientId, device_code: deviceCode } = req.body;

    try {
      const tokenResponse = await registrationProcessService.getDeviceToken(clientId, deviceCode);

      res.send(tokenResponse);
    } catch (error) {
      if (!(error instanceof DeviceTokenError)) {
        throw error;
      }

      res.status(400).send(error.toJSON());
    }
  }
);

export { router as deviceTokenRouter };
