import { HttpErrors } from "../../error";
import { IUserDoc, Users } from "../../model/user";

const findUserById = async (userId: string): Promise<IUserDoc | null> => {
  return Users.findById(userId);
};

const findUserByIdOrThrow404 = async (userId: string): Promise<IUserDoc> => {
  const user = await findUserById(userId);

  if (!user) {
    console.error(`User with ID [${userId}] Not Found`);
    throw new HttpErrors.HttpNotFoundError(`User with ID [${userId}] Not Found`);
  }

  return user;
};

const findUserByEmail = async (email: string): Promise<IUserDoc | null> => {
  return Users.findOne({ email });
};

const findUserByEmailOrThrow404 = async (email: string): Promise<IUserDoc> => {
  const user = await findUserByEmail(email);

  if (!user) {
    console.error(`User with email [${email}] Not Found`);
    throw new HttpErrors.HttpNotFoundError(`User with email [${email}] Not Found`);
  }

  return user;
};

const checkUserExistsAndThrow400 = async (email: string): Promise<void> => {
  const user = await findUserByEmail(email);

  if (user) {
    console.error(`Email [${email}] already in use.`);
    throw new HttpErrors.HttpBadRequestError(`Email [${email}] already in use.`);
  }
};

export {
  findUserByEmail,
  findUserByEmailOrThrow404,
  findUserById,
  findUserByIdOrThrow404,
  checkUserExistsAndThrow400,
};
