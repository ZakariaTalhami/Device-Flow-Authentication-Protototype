import { Document, Model, Schema, Types } from "mongoose";
import { USER_MODEL_PREFIX } from "../../constants";
import { IUser } from "../../inferfaces";
import { encryptPassword } from "../../utils/password";

interface IUserDoc extends Document, IUser {
  createdAt: Date;
  updatedAt: Date;
}

interface IUserModel extends Model<IUserDoc> {}

const userSchema = new Schema<IUserDoc>(
  {
    _id: {
      type: String,
      default: () => {
        return `${USER_MODEL_PREFIX}_${new Types.ObjectId()}`;
      },
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    this.set("password", await encryptPassword(this.password));
  }
});

export { IUserDoc, IUserModel, userSchema };
