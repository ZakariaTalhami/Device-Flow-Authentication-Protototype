import { Router } from "express";
import { randomNumberRouter } from "./random";

const BASE_URL = "/number";
const openRouter = Router();
const secureRouter = Router();

// *********** OPEN ROUTES ************
// openRouter.use(BASE_URL,);
// ************************************

// ********** SECURED ROUTES **********
secureRouter.use(BASE_URL, randomNumberRouter);
// ************************************

export {
  secureRouter as secureNumberRouter,
  openRouter as openNumberRouter,
};
