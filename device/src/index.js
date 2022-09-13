const qrcode = require("qrcode-terminal");

const clientId = "1231654874946313258";

const displayBanner = () => {
  console.log(` _   _  _____ _     _____ _____ _____   _____  _____  _____  _____ `);
  console.log("| | | ||  ___| |   |_   _|  _  /  ___| |  ___||  _  ||  _  ||  _  |");
  console.log("| |_| || |__ | |     | | | | | \\ `--.  |___ \\ | |/' || |/' || |/' |");
  console.log("|  _  ||  __|| |     | | | | | |`--. \\     \\ \\|  /| ||  /| ||  /| |");
  console.log("| | | || |___| |_____| |_\\ \\_/ /\\__/ / /\\__/ /\\ |_/ /\\ |_/ /\\ |_/ /");
  console.log("\\_| |_/\\____/\\_____/\\___/ \\___/\\____/  \\____/  \\___/  \\___/  \\___/ ");
  console.log();
  console.log("A HELIOS.co product.");
  console.log("________________________________________________________________________________");
};

const connectToRemoteServer = (clientId) => {
  return {
    isRegistered: false,
  };
};

const registerDevice = (clientId) => {
  const getServerRegisterInfo = (clientId) => {
    return {
      verificationUri: "https://helios.com/devices",
      deviceCode: "NGU5OWFiNjQ5YmQwNGY3YTdmZTEyNzQ3YzQ1YSA",
      userCode: "BDWP-HQPK",
      interval: 5,
      expiresIn: 1800,
    };
  };
  const constructQrCodeBody = (registerInfo) => {
    return `${registerInfo.verificationUri}/?user_code=${registerInfo.userCode}`;
  };

  const displayRegistrationInfo = (registerInfo) => {
    console.log(`Please register this device with you HELIOS account:\n`);
    qrcode.generate(constructQrCodeBody(registerInfo), { small: true });
    console.log(`URL: ${registerInfo.verificationUri}`);
    console.log(`Code: ${registerInfo.userCode}`);
  };

  const startPollingToken = () => {
    let count = 0;
    setTimeout(function a() {
      if (count === 5) {
        count = 0;
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
      }
      count++;
      process.stdout.write(".");
      setTimeout(a, 500);
    }, 500);
  };

  const registerInfo = getServerRegisterInfo();
  displayRegistrationInfo(registerInfo);
  startPollingToken();
};

const bootDevice = () => {
  displayBanner();
  const remoteConfig = connectToRemoteServer(clientId);
  if (!remoteConfig.isRegistered) {
    registerDevice();
  }
};

bootDevice();
