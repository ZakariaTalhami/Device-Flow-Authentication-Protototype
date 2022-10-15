import jwt from "jsonwebtoken";
import { TokenType, tokenTypes } from "../enum/token-type";
import { HttpErrors } from "../error";

type TokenPayload = string | object | Buffer;

export const generateToken = (
  payload: TokenPayload,
  secret: string,
  expiration: string | number
) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: expiration,
  });
  return token;
};

export const decodeToken = <T = any>(token: string, secret: string) => {
  return jwt.verify(token, secret) as T;
};

export const generateAccessToken = (payload: TokenPayload): string => {
  return generateToken(
    payload,
    process.env.ACCESS_TOKEN_JWT_KEY as string,
    process.env.ACCESS_TOKEN_EXPIRATION as string
  );
};

// TODO: fix the return type {id: string}
export const decodeAccessToken = (token: string): any => {
  return decodeToken(
    token,
    process.env.ACCESS_TOKEN_JWT_KEY as string,
  );
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return generateToken(
    payload,
    process.env.REFRESH_TOKEN_JWT_KEY as string,
    process.env.REFRESH_TOKEN_EXPIRATION as string
  );
};

export const extractTokenTypeFromId= (id: string): TokenType => {
  const prefix = id.substring(0, 4);

  if(!tokenTypes.includes(prefix)) {
    throw new HttpErrors.HttpBadRequestError('Invalid Token Id');
  }

  return prefix as TokenType;
}