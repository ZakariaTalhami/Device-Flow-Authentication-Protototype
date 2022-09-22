import { RegistrationStatus } from "../enum";

export class DeviceTokenError extends Error {
    private errorStatus: RegistrationStatus;

    constructor(errorStatus: RegistrationStatus) {
        super();
        this.errorStatus = errorStatus;
    }

    getErrorStatus() : RegistrationStatus{
        return this.errorStatus;
    }

    toJSON() {
        return {
            error: this.errorStatus
        }
    }
}