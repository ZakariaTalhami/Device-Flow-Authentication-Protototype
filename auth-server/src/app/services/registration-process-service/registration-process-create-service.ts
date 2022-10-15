import { REGISTRATION_PROCESS_EXPIRATION, USER_CODE_REGEX } from "../../constants";
import { IRegistrationProcessDoc, RegistrationProcesses } from "../../model/registration-process";
import { getExpirationFromNow } from "../../utils/dates";
import { generateDeviceCode, generateCodeFromPattern } from "../../utils/generate";

export const createNewRegistrationProcess = async (
  clientId: string
): Promise<IRegistrationProcessDoc> => {
  const deviceCode = generateDeviceCode();
  const userCode = generateCodeFromPattern(USER_CODE_REGEX);
  const expireTime = getExpirationFromNow(REGISTRATION_PROCESS_EXPIRATION);

  const registration = await RegistrationProcesses.create({
    clientId,
    deviceCode,
    userCode,
    expireTime,
  });

  return registration;
};
