import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { validateRequest } from "../../middleware";
import { userService } from "../../services/user";
import { httpResponse } from "../../utils/httpResponse";

const router = Router();

type UserSignupBody = {
  email: string;
  password: string;
};

router.post(
  "/",
  [
    body("email").isEmail().notEmpty().withMessage("Email must be a valid email"),
    body("password").isString().notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  async (req: Request<{}, any, UserSignupBody>, res: Response) => {
    const { email, password } = req.body;

    const user = await userService.signupNewUser(email, password);

    httpResponse.created(res, user, "Sign up was successful");
  }
);

export { router as signupUserRouter };
