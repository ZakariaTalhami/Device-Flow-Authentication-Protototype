import { Request, Response, Router } from "express";
import { REGISTRATION_PROCESS_EXPIRATION, REGISTRATION_PROCESS_INTERVAL } from "../../constants";
import { registrationProcessService } from "../../services/registration-process-service";
import dns from "dns";
import os from "os";
import { body } from "express-validator";
import { DeviceCodeBody } from "../../types";

// TODO: move or find better solution
const getIPAddress = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    dns.lookup(os.hostname(), function (err, addr) {
      if (err) {
        reject(err);
      } else {
        resolve(addr);
      }
    });
  });
};

const router = Router();

router.post(
  "/code",
  [body("client_id", "clientId is required").isString().notEmpty()],
  async (req: Request<any, any, DeviceCodeBody>, res: Response) => {
    const { client_id: clientId } = req.body;

    const registrationProcess = await registrationProcessService.createNewRegistrationProcess(
      clientId
    );

    const ipAddr = await getIPAddress();

    res.status(200).send({
      device_code: registrationProcess.deviceCode,
      user_code: registrationProcess.userCode,
      verification_uri: `https://${ipAddr}/device`,
      interval: REGISTRATION_PROCESS_INTERVAL,
      expires_in: REGISTRATION_PROCESS_EXPIRATION,
    });
  }
);

export { router as deviceCodeRouter };
