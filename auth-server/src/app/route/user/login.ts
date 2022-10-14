import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { IUserLoginSignupDTO, IUserWithToken } from "../../inferfaces";
import { validateRequest } from "../../middleware";
import { userService } from "../../services/user";
import { httpResponse } from "../../utils/httpResponse";

const router = Router();

router.post(
  "/login",
  [
    body("email").isEmail().notEmpty().withMessage("Email must be a valid email"),
    body("password").isString().notEmpty().withMessage("Password is required"),
  ],
  validateRequest,
  async (req: Request<{}, IUserWithToken, IUserLoginSignupDTO>, res: Response) => {
    const { email, password } = req.body;

    const user = await userService.loginUser(email, password);

    httpResponse.ok(res, user, "Login Sucessfull");
  }
);

export { router as loginUserRouter };
