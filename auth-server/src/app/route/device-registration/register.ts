import { Request, Response, Router } from "express";
import { registrationProcessService } from "../../services/registration-process-service";
import { httpResponse } from "../../utils/httpResponse";

const router = Router();

type RegisterDeviceBody = {
  user_code: string;
};

// TODO: authenticate the user
router.post("/register", async (req: Request<any, any, RegisterDeviceBody>, res: Response) => {
  const { user_code: userCode } = req.body;

  await registrationProcessService.authenticateDevice(userCode);

  httpResponse.ok(res, {}, "Device registered and authenticated");
});

export { router as deviceRegisterRouter };
