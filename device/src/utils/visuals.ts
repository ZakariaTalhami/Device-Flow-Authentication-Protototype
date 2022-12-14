import { loopingFunction } from "./function";
import figlet from "figlet";

export const displayBanner = () => {
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

type LoadingDotsOptions = {
  hasCompleted: () => boolean;
  numberOfDots?: number;
  duration?: number;
};

const defaultLoadingDotsOptions = {
  hasCompleted: () => false,
  numberOfDots: 5,
  duration: 500,
};

export const displayLoadingDots = (loadingOptions: LoadingDotsOptions) => {
  loadingOptions.hasCompleted ||= defaultLoadingDotsOptions.hasCompleted;
  loadingOptions.numberOfDots ||= defaultLoadingDotsOptions.numberOfDots;
  loadingOptions.duration ||= defaultLoadingDotsOptions.duration;

  let count = 0;
  const cb = async () => {
    if (count === loadingOptions.numberOfDots) {
      count = 0;
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
    }
    count++;
    process.stdout.write(".");
  };

  loopingFunction(cb, loadingOptions.hasCompleted, loadingOptions.duration);
};

export const clearConsole = () => {
  var lines = process.stdout.rows;
  for (var i = 0; i < lines; i++) {
    process.stdout.cursorTo(0, i);
    process.stdout.clearLine(0);
  }

  process.stdout.cursorTo(0, 0);
};

export const displayRandomNumber = (number: number) => {
  clearConsole();

  figlet.text(
    number.toString(),
    {
      font: "Doh",
    },
    (err, data) => {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      process.stdout.write(data || "");
      process.stdout.cursorTo(0, process.stdout.rows);
    }
  );
};
