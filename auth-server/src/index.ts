require('express-async-errors');
import dotenv from "dotenv";
dotenv.config();

import { initializeMongoDB } from "./boot/db-connection";

const boot = async () => {
  await initializeMongoDB();
};

const startServer = async () => {
  const { app } = await import("./app");

  const port: number = parseInt(process.env.PORT as string, 10) || 8080;

  app.listen(port, () => {
    console.log(`------------ Listening on port ${port} ------------`);
  });
};

(async () => {
  try {
    await boot();
    await startServer();
  } catch (error: any) {
    console.log(`Failed to boot... | ${error}`);
    console.log(error);
  }
})();