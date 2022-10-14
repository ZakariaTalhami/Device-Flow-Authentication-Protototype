import { HttpErrors } from "../../error";
import { IUserWithToken } from "../../inferfaces";
import { IUserDoc, Users } from "../../model/user";
import { validatePassword } from "../../utils/password";
import { checkUserExistsAndThrow400, findUserByEmail } from "./user-query-service";

const signupNewUser = async (email: string, password: string): Promise<IUserDoc> => {
  // Check if user already exists
  await checkUserExistsAndThrow400(email);
  // Validate Password Format
  validatePassword(password);

  // Create User
  const user = await Users.create({
    email,
    password,
  });

  return user;
};

const loginUser = async (email: string, password: string): Promise<IUserWithToken> => {
  const user = await findUserByEmail(email);
  if (!user) {
    console.error(`User [${email}] doesnt exist`);
    throw new HttpErrors.HttpUnauthorizedError("Invalid Credentials");
  }

  const isVerified = await user.verifyPassword(password);
  if (!isVerified) {
    console.error(`User [${email}] Password verification failure`);
    throw new HttpErrors.HttpUnauthorizedError("Invalid Credentials");
  }

  const token = await user.generateToken();

  return {
    ...user.toObject(),
    token,
  };
};

export { signupNewUser, loginUser };
