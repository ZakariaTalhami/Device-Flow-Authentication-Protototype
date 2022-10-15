import { Document, Model, Schema, Types } from "mongoose";
import { DEVICE_MODEL_PREFIX, DEVICE_NAME_REGEX } from "../../constants";
import { IDevice } from "../../inferfaces";
import { generateCodeFromPattern } from "../../utils/generate";

interface IDeviceDoc extends Document, IDevice {
  createdAt: Date;
  updatedAt: Date;
}

interface IDeviceModel extends Model<IDeviceDoc> {}

const deviceSchema = new Schema<IDeviceDoc>(
  {
    _id: {
      type: String,
      default: () => {
        return `${DEVICE_MODEL_PREFIX}_${new Types.ObjectId()}`;
      },
    },
    clientId: {
      type: String,
      required: true,
      index: true,
    },
    owner: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      default: () => generateCodeFromPattern(DEVICE_NAME_REGEX),
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toObject: {
      transform(doc, ret, options) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
      },
    },
    toJSON: {
      transform(doc, ret, options) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export { IDeviceDoc, IDeviceModel, deviceSchema };
