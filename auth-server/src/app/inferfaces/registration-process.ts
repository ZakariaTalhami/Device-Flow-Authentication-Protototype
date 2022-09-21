import { RegistrationStatus } from "../enum/registration-status";

export interface IRegistrationProcess {
    clientId: string;
    deviceCode: string; 
    userCode: string;
    expireTime: Date;
    status: RegistrationStatus
}