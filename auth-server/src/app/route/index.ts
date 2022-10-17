import { Router } from "express";
import {
  openDeviceRegistrationRouter,
  secureDeviceRegistrationRouter,
} from "./device-registration";
import { openNumberRouter, secureNumberRouter } from "./number";
import { openUserRouter, secureUserRouter } from "./user";
import { validateTokenRouter } from "./validate-token";

const BASE_URL = "";
const openRouter = Router();
const secureRouter = Router();

// *********** OPEN ROUTES ************
openRouter.use(BASE_URL, openDeviceRegistrationRouter);
openRouter.use(BASE_URL, openUserRouter);
openRouter.use(BASE_URL, openNumberRouter);
// ************************************

// ********** SECURED ROUTES **********
secureRouter.use(BASE_URL, secureDeviceRegistrationRouter);
secureRouter.use(BASE_URL, secureUserRouter);
secureRouter.use(BASE_URL, secureNumberRouter);
secureRouter.use(BASE_URL, validateTokenRouter);
// ************************************

export { secureRouter, openRouter };
