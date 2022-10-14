import * as userOperationsFuncs from "./user-operations-service";
import * as userQueryFuncs from "./user-query-service";

export const userService = {
  ...userOperationsFuncs,
  ...userQueryFuncs,
};
