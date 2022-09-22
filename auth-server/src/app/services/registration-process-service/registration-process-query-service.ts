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


export {
  findRegistrationProcessByDeviceCode
}