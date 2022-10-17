import { IDevice } from "../../inferfaces";
import { Devices } from "../../model/device";

const createDevice = async (deviceInfo: Pick<IDevice, "clientId" | "owner">) => {
  return Devices.create(deviceInfo);
};

export { createDevice };
