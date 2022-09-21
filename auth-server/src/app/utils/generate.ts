import { randomUUID } from "crypto";
import { randexp } from "randexp";

export const generateDeviceCode = (): string => {
  return randomUUID();
};

export const generateUserCode = (pattern: RegExp): string => {
  return randexp(pattern);
};
