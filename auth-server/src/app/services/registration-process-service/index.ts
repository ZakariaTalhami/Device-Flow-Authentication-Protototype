import * as registrationProcessCreateFunctions from "./registration-process-create-service";

export const registrationProcessService = {
  ...registrationProcessCreateFunctions,
} as const;
