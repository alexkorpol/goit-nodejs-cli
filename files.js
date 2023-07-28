const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");
const { readdir } = require("fs");

const createFile = async (fileName, content) => {
  const file = {
    fileName,
    content,
  };
  const data = dataValidator(file);
  // console.log(data.error.details[0]);
  if (data.error) {
    console.log(
      chalk.red(`Please specify ${data.error.details[0].path[0]} parameter`)
    );
    return;
  }
  const { extention, result } = checkExtention(fileName);

  if (!result) {
    console.log(chalk.red(`Sorry this appl ${extention}dosent support`));
    return;
  }
  const filePath = path.join(__dirname, "./files", fileName);
  try {
    await fs.writeFile(filePath, content, "utf-8");
    console.log(chalk.green(`File is created successfull`));
  } catch (error) {
    console.log(error);
  }
};

const getFiles = async () => {
  const pathFolder = path.join(__dirname, "./files");
  const arrayFiles = await fs.readdir(pathFolder);
  if (!arrayFiles.length) {
    console.log(chalk.red(`this folder is empty`));
    return;
  }
  console.log(arrayFiles);
};

const getInfo = async (fileName) => {
  const pathFolder = path.join(__dirname, "./files");
  const arrayFiles = await fs.readdir(pathFolder);
  const checkName = arrayFiles.includes(fileName);
  if (!checkName) {
    console.log(chalk.red(`this file ${fileName} is not found`));
    return;
  }
  const pathFile = path.join(__dirname, "./files", fileName);
  const text = await fs.readFile(pathFile, "utf-8");
  console.log(text);
};

module.exports = {
  createFile,
  getFiles,
  getInfo,
};
