if (!process.env.ACCESS_TOKEN_JWT_KEY) {
  throw new Error("ACCESS_TOKEN_JWT_KEY must be defined");
}
if (!process.env.ACCESS_TOKEN_EXPIRATION) {
  throw new Error("ACCESS_TOKEN_EXPIRATION must be defined");
}
if (!process.env.ACCESS_TOKEN_TYPE) {
  throw new Error("ACCESS_TOKEN_TYPE must be defined");
}
if (!process.env.REFRESH_TOKEN_JWT_KEY) {
  throw new Error("REFRESH_TOKEN_JWT_KEY must be defined");
}
if (!process.env.REFRESH_TOKEN_EXPIRATION) {
  throw new Error("REFRESH_TOKEN_EXPIRATION must be defined");
}

export const ACCESS_TOKEN_JWT_KEY = process.env.ACCESS_TOKEN_JWT_KEY;
export const ACCESS_TOKEN_EXPIRATION = process.env.ACCESS_TOKEN_EXPIRATION;
export const ACCESS_TOKEN_TYPE = process.env.ACCESS_TOKEN_TYPE;
export const REFRESH_TOKEN_JWT_KEY = process.env.REFRESH_TOKEN_JWT_KEY;
export const REFRESH_TOKEN_EXPIRATION = process.env.REFRESH_TOKEN_EXPIRATION;
