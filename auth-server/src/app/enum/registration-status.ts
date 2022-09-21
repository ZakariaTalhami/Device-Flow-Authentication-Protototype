export enum RegistrationStatus {
  AUTHORIZATION_PENDING = "authorization_pending",
  ACCESS_DENIED = "access_denied",
  AUTHENTICATED = "authenticated",
  FAILURE = "failure",
  SUCCESS = "success",
}

export const registrationStatues = Object.values(RegistrationStatus) as string[];
