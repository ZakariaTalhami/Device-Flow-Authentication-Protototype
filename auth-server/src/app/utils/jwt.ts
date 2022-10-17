import jwt from "jsonwebtoken";
import { READABLE_TOKEN_TYPE_NAME, TokenType, tokenTypes } from "../enum/token-type";
import { HttpErrors } from "../error";
import { TokenDecodedPayload, TokenPayload } from "../inferfaces";

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

export const decodeAccessToken = (token: string): TokenDecodedPayload => {
  return decodeToken(token, process.env.ACCESS_TOKEN_JWT_KEY as string);
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return generateToken(
    payload,
    process.env.REFRESH_TOKEN_JWT_KEY as string,
    process.env.REFRESH_TOKEN_EXPIRATION as string
  );
};

export const extractTokenTypeFromId = (id: string): TokenType => {
  const prefix = id.substring(0, 4);

  if (!tokenTypes.includes(prefix)) {
    throw new HttpErrors.HttpBadRequestError("Invalid Token Id");
  }

  return prefix as TokenType;
};

export const getReadableIdType = (idType: TokenType) => {
  return READABLE_TOKEN_TYPE_NAME[idType];
};
