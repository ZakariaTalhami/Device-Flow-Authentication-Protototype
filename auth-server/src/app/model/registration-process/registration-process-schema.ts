import { Document, Model, Schema } from "mongoose";
import { RegistrationStatus } from "../../enum";
import { IRegistrationProcess } from "../../inferfaces";

interface IRegistrationProcessDoc extends Document, IRegistrationProcess {
  createAt: Date;
  updatedAt: Date;
}

interface IRegistrationProcessModel extends Model<IRegistrationProcessDoc> {}

const registrationprocessSchema = new Schema<IRegistrationProcessDoc>(
  {
    clientId: {
      type: String,
      required: true,
      index: true,
    },
    deviceCode: {
      type: String,
      required: true,
      index: true,
    },
    userCode: {
      type: String,
      required: true,
    },
    expireTime: {
      type: Date,
    },
    status: {
      type: String,
      default: RegistrationStatus.AUTHORIZATION_PENDING,
    },
  },
  {
    timestamps: true,
  }
);

export { IRegistrationProcessDoc, IRegistrationProcessModel, registrationprocessSchema };
