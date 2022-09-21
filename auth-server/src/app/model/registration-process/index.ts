import mongoose from "mongoose";
import {
  DB_REGISTRATION_FPROCESS_COLLECTION_NAME,
  DB_REGISTRATION_PROCESS_MODEL_NAME,
} from "../../constants";
import {
  IRegistrationProcessDoc,
  IRegistrationProcessModel,
  registrationprocessSchema,
} from "./registration-process-schema";

const RegistrationProcesses: IRegistrationProcessModel = mongoose.model<
  IRegistrationProcessDoc,
  IRegistrationProcessModel
>(
  DB_REGISTRATION_PROCESS_MODEL_NAME,
  registrationprocessSchema,
  DB_REGISTRATION_FPROCESS_COLLECTION_NAME
);

export { IRegistrationProcessDoc, RegistrationProcesses };
