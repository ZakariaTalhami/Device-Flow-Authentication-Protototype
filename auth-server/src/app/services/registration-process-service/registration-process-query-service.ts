import { HttpErrors } from "../../error";
import { IRegistrationProcessDoc, RegistrationProcesses } from "../../model/registration-process";

const findRegistrationProcessByDeviceCode = async (
  clientId: string,
  deviceCode: string
): Promise<IRegistrationProcessDoc | null> => {
  return RegistrationProcesses.findOne({
    deviceCode,
    clientId,
  });
};

const findRegistrationProcessByUserCode = async (userCode: string) => {
  return RegistrationProcesses.findOne({
    userCode,
  });
};

const findRegistrationProcessByUserCodeOrThrow = async (
  userCode: string
): Promise<IRegistrationProcessDoc> => {
  const registrationProcess = await findRegistrationProcessByUserCode(userCode);

  if (!registrationProcess) {
    console.error(`Registration Not Found with user code [${userCode}]`);
    throw new HttpErrors.HttpBadRequestError(`User code [${userCode}] is invalid`);
  }

  return registrationProcess;
};

export {
  findRegistrationProcessByDeviceCode,
  findRegistrationProcessByUserCode,
  findRegistrationProcessByUserCodeOrThrow,
};
