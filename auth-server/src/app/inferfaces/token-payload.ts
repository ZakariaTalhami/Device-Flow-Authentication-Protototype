import { TokenType } from "../enum/token-type";
import { IDevice } from "./device";
import { IUser } from "./user";

export interface TokenPayload {
  id: string;
}

export interface TokenDecodedPayload extends TokenPayload {
  iat: number;
  exp: number;
  entityType: TokenType;
}

export interface TokenValidationResponse extends TokenDecodedPayload {
  readableEntityType: string;
  data: IUser | IDevice | null;
}
