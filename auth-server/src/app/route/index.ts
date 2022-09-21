import { Router } from "express";
import { openDeviceRegistrationRouter, secureDeviceRegistrationRouter } from "./device-registration";

const BASE_URL = "";
const openRouter = Router();
const secureRouter = Router();

// *********** OPEN ROUTES ************
// openRouter.use(BASE_URL, );
// ************************************

// ********** SECURED ROUTES **********
// secureRouter.use(BASE_URL, );
// ************************************

export { secureRouter, openRouter };
