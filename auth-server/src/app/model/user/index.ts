import mongoose from "mongoose";
import { DB_USER_COLLECTION_NAME, DB_USER_MODEL_NAME } from "../../constants";
import { generateAccessToken } from "../../utils/jwt";
import { comparePasswords } from "../../utils/password";
import { IUserDoc, IUserModel, userSchema } from "./user-schema";

userSchema.methods.verifyPassword = function (this: IUserDoc, password: string): Promise<boolean> {
  return comparePasswords(password, this.password);
};

userSchema.methods.generateToken = function (this: IUserDoc) {
  const payload = {
    id: this._id,
    email: this.email,
  };
  return generateAccessToken(payload);
};

const Users: IUserModel = mongoose.model<IUserDoc, IUserModel>(
  DB_USER_MODEL_NAME,
  userSchema,
  DB_USER_COLLECTION_NAME
);

export { IUserDoc, Users };
