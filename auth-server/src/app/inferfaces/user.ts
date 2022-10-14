export interface IUser {
  email: string;
  password: string;
}

export interface IUserWithToken extends IUser {
  token: string;
}

export interface IUserLoginSignupDTO {
  email: string;
  password: string;
}
