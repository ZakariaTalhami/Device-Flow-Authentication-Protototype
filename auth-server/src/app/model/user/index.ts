import mongoose from "mongoose";
import { DB_USER_COLLECTION_NAME, DB_USER_MODEL_NAME } from "../../constants";
import { IUserDoc, IUserModel, userSchema } from "./user-schema";

const Users: IUserModel = mongoose.model<IUserDoc, IUserModel>(
  DB_USER_MODEL_NAME,
  userSchema,
  DB_USER_COLLECTION_NAME
);

export { IUserDoc, Users };
