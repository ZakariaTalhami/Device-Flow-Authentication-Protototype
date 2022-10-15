import mongoose from "mongoose";
import { DB_DEVICE_COLLECTION_NAME, DB_DEVICE_MODEL_NAME } from "../../constants";
import { IDeviceDoc, IDeviceModel, deviceSchema } from "./device-schema";

const Devices: IDeviceModel = mongoose.model<IDeviceDoc, IDeviceModel>(
  DB_DEVICE_MODEL_NAME,
  deviceSchema,
  DB_DEVICE_COLLECTION_NAME
);

export { IDeviceDoc, Devices };
