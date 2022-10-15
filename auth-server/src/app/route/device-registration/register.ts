import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { USER_CODE_REGEX } from "../../constants";
import { validateRequest } from "../../middleware";
import { onlyTokenOfTypeUser } from "../../middleware/only-token-of-type";
import { registrationProcessService } from "../../services/registration-process-service";
import { httpResponse } from "../../utils/httpResponse";

const router = Router();

type RegisterDeviceBody = {
  user_code: string;
};

router.post(
  "/register",
  onlyTokenOfTypeUser,
  [
    body("user_code")
      .isString()
      .notEmpty()
      .withMessage("user_code field is required")
      .matches(USER_CODE_REGEX)
      .withMessage("Invalid user_code format"),
  ],
  validateRequest,
  async (req: Request<any, any, RegisterDeviceBody>, res: Response) => {
    const { user_code: userCode } = req.body;

    await registrationProcessService.authenticateDevice(userCode);

    httpResponse.ok(res, {}, "Device registered and authenticated");
  }
);

export { router as deviceRegisterRouter };
