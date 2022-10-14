import { IUserDoc, Users } from "../../model/user";
import { validatePassword } from "../../utils/password";
import { checkUserExistsAndThrow400 } from "./user-query-service";

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

export { signupNewUser };
