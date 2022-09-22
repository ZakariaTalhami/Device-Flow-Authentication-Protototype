import { Router } from "express";
import { deviceCodeRouter } from "./device-code";
import { deviceTokenRouter } from "./token";

const BASE_URL = "/device";
const openRouter = Router();
const secureRouter = Router();

// *********** OPEN ROUTES ************
openRouter.use(BASE_URL, deviceCodeRouter);
openRouter.use(BASE_URL, deviceTokenRouter);
// ************************************

// ********** SECURED ROUTES **********
// secureRouter.use(BASE_URL, );
// ************************************

export {
  secureRouter as secureDeviceRegistrationRouter,
  openRouter as openDeviceRegistrationRouter,
};
