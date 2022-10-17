export enum TokenType {
  USER = "user",
  DEVICE = "devc",
}

export const tokenTypes = Object.values(TokenType) as string[];

export const READABLE_TOKEN_TYPE_NAME: Record<TokenType, string> = {
  [TokenType.USER]: "User",
  [TokenType.DEVICE]: "Device",
} as const;
