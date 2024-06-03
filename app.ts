#! /usr/bin/env node

import inquirer from "inquirer";
import { differenceInSeconds } from "date-fns";
import chalk from "chalk";

console.log(chalk.bgYellow.bold.italic("\n\tWelcome to Muhammad Ubaid - CountDown Timer ⏲  \n\t"));

const res = await inquirer.prompt({
  type: "number",
  name: "userInput",
  message: "Enter amount of second:",
  validate: (input) => {
    if (isNaN(input)) {
      return "Please enter valid number";
    } else if (input > 60) {
      return "Second must within 60";
    } else {
      return true;
    }
  },
});

let input = res.userInput;

function startTime(val: number) {
  const intTime = new Date().setSeconds(new Date().getSeconds() + val);
  const intervalTime = new Date(intTime);
  setInterval(() => {
    const currentTime = new Date();
    const timeDiff = differenceInSeconds(intervalTime, currentTime);
    if (timeDiff <= 0) {
      console.log(chalk.bgRed.bold.italic("\n\tTime up! ⌛\n\t"));
      process.exit();
    }
    const min = Math.floor((timeDiff % (3600 * 24)) / 3600);
    const sec = Math.floor(timeDiff % 60);
    console.log(
      `\n${min.toString().padStart(2, "0")}: ${sec.toString().padStart(2, "0")}\n`
    );
  }, 1000);
}
startTime(input);
