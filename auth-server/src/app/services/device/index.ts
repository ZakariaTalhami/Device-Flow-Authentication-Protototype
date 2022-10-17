import * as deviceOperationsFuncs from "./device-operations-service";
import * as deviceQueryFuncs from "./devidce-query-service";

export const deviceService = {
  ...deviceOperationsFuncs,
  ...deviceQueryFuncs,
};
