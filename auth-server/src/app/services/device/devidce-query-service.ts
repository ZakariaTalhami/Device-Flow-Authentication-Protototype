import { Devices, IDeviceDoc } from "../../model/device";

const findDeviceById = async (deviceID: string): Promise<IDeviceDoc | null> => {
  return Devices.findById(deviceID);
};

const findDeviceByClientId = async (clientId: string): Promise<IDeviceDoc | null> => {
  return Devices.findOne({ clientId });
};

export { findDeviceById, findDeviceByClientId };
