import { AxiosError } from "axios";
import qrcode from "qrcode-terminal";
import url from "url";
import { RegistrationStatus } from "../enum";
import { DeviceTokenError } from "../error";
import { IDeviceTokenResponse } from "../inferfaces";
import { getAuthServiceAxiosInstance } from "../utils/axios-instances";
import { loopingFunction } from "../utils/function";
import { displayLoadingDots } from "../utils/visuals";

let hasGottenAuthenticationResponse = false;
const AUTH_SERVICE_DEVICE_CODE = "/device/code";
const AUTH_SERVICE_DEVICE_TOKEN = "/device/token";

export const authenticateDevice = async (clientId: string): Promise<IDeviceTokenResponse> => {
  const registerInfo = await getServerRegisterInfo(clientId);
  displayRegistrationInfo(registerInfo);
  return await startPollingToken(clientId, registerInfo.device_code, registerInfo.interval);
};

const startPollingToken = async (
  clientId: string,
  deviceCode: string,
  interval: number = 5
): Promise<IDeviceTokenResponse> => {
  const hasAuthenticationCompleted = () => hasGottenAuthenticationResponse;

  displayLoadingDots({
    hasCompleted: hasAuthenticationCompleted,
    numberOfDots: 5,
    duration: 500,
  });

  const authResponse = await loopingFunction<IDeviceTokenResponse>(
    async () => {
      try {
        const authResponse = await getDeviceToken(clientId, deviceCode);
        hasGottenAuthenticationResponse = true;
        return authResponse as IDeviceTokenResponse;
      } catch (error: any) {
        if (!(error instanceof DeviceTokenError))
          throw new Error(`Something has gone wrong: ${error.message}`);

        if (error.getErrorStatus() === RegistrationStatus.ACCESS_DENIED) {
          throw new Error("Failed to authenticate with server!");
        }
      }

      return null;
    },
    hasAuthenticationCompleted,
    interval * 1000
  );

  console.log("AUTHENTICATION COMPLETE");

  return authResponse as IDeviceTokenResponse;
};

const getServerRegisterInfo = async (clientId: string) => {
  return getRegistrationInfo(clientId);
};

const constructQrCodeBody = (registerInfo: any) => {
  return `${registerInfo.verification_uri}/?user_code=${registerInfo.user_code}`;
};

const getRegistrationInfo = async (clientId: string) => {
  let registrationInfo;
  try {
    const params = new url.URLSearchParams({ client_id: clientId });
    registrationInfo = await getAuthServiceAxiosInstance()
      .post(AUTH_SERVICE_DEVICE_CODE, params)
      .then((res) => res.data);
  } catch (error) {
    console.error(error);
    throw new Error();
  }

  return registrationInfo;
};

const getDeviceToken = async (clientId: string, deviceCode: string) => {
  let tokenResponse;
  try {
    const params = new url.URLSearchParams({ client_id: clientId, device_code: deviceCode });
    tokenResponse = await getAuthServiceAxiosInstance()
      .post(AUTH_SERVICE_DEVICE_TOKEN, params)
      .then((res) => res.data);
  } catch (error: any) {
    const err = error as AxiosError;
    const errorStatus = err.response?.status;
    const errorData = err.response?.data as any;

    if (errorStatus === 400) {
      const deviceErrorStatus = errorData.error as RegistrationStatus;
      throw new DeviceTokenError(deviceErrorStatus);
    }

    throw new Error(err.message);
  }

  return tokenResponse;
};

const displayRegistrationInfo = (registerInfo: any) => {
  console.log(`Please register this device with you HELIOS account:\n`);
  qrcode.generate(constructQrCodeBody(registerInfo), { small: true });
  console.log(`URL: ${registerInfo.verification_uri}`);
  console.log(`Code: ${registerInfo.user_code}`);
};
