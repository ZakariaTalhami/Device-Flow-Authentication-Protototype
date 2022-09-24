import { ACCESS_TOKEN_EXPIRATION, ACCESS_TOKEN_TYPE } from "../../constants";
import { RegistrationStatus } from "../../enum";
import { DeviceTokenError, HttpErrors } from "../../error";
import { IDeviceQueryResponse } from "../../inferfaces";
import { IRegistrationProcessDoc } from "../../model/registration-process";
import { convertTimeNotationToSeconds } from "../../utils/dates";
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt";
import {
  findRegistrationProcessByDeviceCode,
  findRegistrationProcessByUserCodeOrThrow,
} from "./registration-process-query-service";

export const getDeviceToken = async (
  clientId: string,
  deviceCode: string
): Promise<IDeviceQueryResponse> => {
  let registrationProcess = await findRegistrationProcessByDeviceCode(clientId, deviceCode);

  if (!registrationProcess) {
    throw new HttpErrors.HttpBadRequestError("Invalid client_id or device_Code");
  }

  if (isRegistrationProcessComplete(registrationProcess)) {
    throw new HttpErrors.HttpBadRequestError("Invalid client_id or device_Code");
  }

  if (registrationProcess.status !== RegistrationStatus.AUTHENTICATED) {
    throw new DeviceTokenError(registrationProcess.status);
  }

  const accessToken = generateAccessToken({});
  const refreshToken = generateRefreshToken({});

  // Update registration Process to succes after token generation
  registrationProcess.status = RegistrationStatus.SUCCESS;
  await registrationProcess.save();

  return {
    access_token: accessToken,
    refresh_token: refreshToken,
    token_type: ACCESS_TOKEN_TYPE,
    expires: convertTimeNotationToSeconds(ACCESS_TOKEN_EXPIRATION),
    scope: "read",
  };
};

export const authenticateDevice = async (userCode: string): Promise<IRegistrationProcessDoc> => {
  let registrationProcess = await findRegistrationProcessByUserCodeOrThrow(userCode);

  registrationProcess.status = RegistrationStatus.AUTHENTICATED
  await registrationProcess.save();

  return registrationProcess;
};

const isRegistrationProcessComplete = (regProcess: IRegistrationProcessDoc): boolean => {
  return (
    regProcess.status === RegistrationStatus.SUCCESS ||
    regProcess.status === RegistrationStatus.FAILURE
  );
};
