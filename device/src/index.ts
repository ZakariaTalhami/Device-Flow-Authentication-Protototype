import { authenticateDevice } from "./services/authentication";
import { displayBanner } from "./utils/visuals";

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
    console.log(authData);
  }
};

bootDevice();
