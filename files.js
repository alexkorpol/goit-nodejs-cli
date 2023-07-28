const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");

const createFile = (fileName, content) => {
  const file = {
    fileName,
    content
  };
  const data = dataValidator(file);
  // console.log(data.error.details[0]);
  if (data.error) {
    console.log(
      chalk.red(`Please specify ${data.error.details[0].path[0]} parameter`)
    )
  }
}

module.exports = {
  createFile,
};