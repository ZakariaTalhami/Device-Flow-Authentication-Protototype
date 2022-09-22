import * as registrationProcessQueryFunctions from "./registration-process-query-service";
import * as registrationProcessCreateFunctions from "./registration-process-create-service";
import * as registrationProcessUpdateFunctions from "./registration-process-update-service";

export const registrationProcessService = {
  ...registrationProcessCreateFunctions,
  ...registrationProcessQueryFunctions,
  ...registrationProcessUpdateFunctions,
} as const;
