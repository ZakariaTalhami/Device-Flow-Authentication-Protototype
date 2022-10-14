import { Router } from "express";
import { signupUserRouter } from "./signup";

const BASE_URL = "/user";
const openRouter = Router();
const secureRouter = Router();

// *********** OPEN ROUTES ************
openRouter.use(BASE_URL, signupUserRouter);
// ************************************

// ********** SECURED ROUTES **********
// secureRouter.use(BASE_URL);
// ************************************

export { secureRouter as secureUserRouter, openRouter as openUserRouter };
