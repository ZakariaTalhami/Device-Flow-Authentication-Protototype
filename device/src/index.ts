import { authenticateDevice } from "./services/authentication";
import { getRandomNumber } from "./services/number";
import { loopingFunction } from "./utils/function";
import { clearConsole, displayBanner, displayRandomNumber } from "./utils/visuals";

const clientId = "1231654874946313258";

const connectToRemoteServer = (clientId: string) => {
  return {
    isAuthenticated: false,
  };
};

const bootDevice = async () => {
  displayBanner();

  const remoteConfig = connectToRemoteServer(clientId);
  if (!remoteConfig.isAuthenticated) {
    const authData = await authenticateDevice(clientId);
    await runDeviceOperations(authData.access_token);
  }
};

const runDeviceOperations = async (token: string) => {
  await loopingFunction(
    async () => {
      const randomNumber = await getRandomNumber(token);
      displayRandomNumber(randomNumber);
    },
    () => false,
    5000
  );
};

bootDevice();
