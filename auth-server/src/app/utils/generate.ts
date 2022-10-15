import { randomUUID } from "crypto";
import { randexp } from "randexp";

export const generateDeviceCode = (): string => {
  return randomUUID();
};

export const generateCodeFromPattern = (pattern: RegExp): string => {
  return randexp(pattern);
};
