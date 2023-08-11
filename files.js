const fs = require("fs/promises");
const path = require("path");
const dataValidator = require("./helpers/dataValidator");
const checkExtention = require("./helpers/checkExtention");

const createFile = async (req, res) => {
  const file = req.body;
  const data = dataValidator(file);
  if (data.error) {
    res.status(400).json({
      message: `Please specify ${data.error.details[0].path[0]} parameter`,
    });
    return;
  }
  const { extention, result } = checkExtention(file.fileName);
  if (!result) {
    res
      .status(400)
      .json({ message: `Sorry this appl ${extention} dosent support` });
    return;
  }
  const filePath = path.join(__dirname, "./files", file.fileName);
  try {
    await fs.writeFile(filePath, file.content, "utf-8");
    res.status(201).json({ message: `File is created successfull` });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getFiles = async (req, res) => {
  const pathFolder = path.join(__dirname, "./files");
  const arrayFiles = await fs.readdir(pathFolder);
  if (!arrayFiles.length) {
    res.status(404).json({ message: `this folder is empty` });
    return;
  }
  res.json(arrayFiles);
};

const getInfo = async (req, res) => {
  const { fileName } = req.params;
  const pathFolder = path.join(__dirname, "./files");
  const arrayFiles = await fs.readdir(pathFolder);
  const checkName = arrayFiles.includes(fileName);
  if (!checkName) {
    res.status(404).json({ message: `this file ${fileName} is not found` });
    return;
  }
  const pathFile = path.join(__dirname, "./files", fileName);
  const text = await fs.readFile(pathFile, "utf-8");
  const ext = path.extname(fileName);
  const base = path.basename(fileName, ext);
  const object = {
    name: base,
    extention: ext,
    content: text,
  };
  res.json(object);
};

module.exports = {
  createFile,
  getFiles,
  getInfo,
};

// const fs = require("fs/promises");
// const path = require("path");
// const chalk = require("chalk");
// const dataValidator = require("./helpers/dataValidator");
// const checkExtention = require("./helpers/checkExtention");
// const { readdir } = require("fs");

// const createFile = async (fileName, content) => {
//   const file = {
//     fileName,
//     content,
//   };
//   const data = dataValidator(file);
//   if (data.error) {
//     console.log(
//       chalk.red(`Please specify ${data.error.details[0].path[0]} parameter`)
//     );
//     return;
//   }
//   const { extention, result } = checkExtention(fileName);

//   if (!result) {
//     console.log(chalk.red(`Sorry this appl ${extention}dosent support`));
//     return;
//   }
//   const filePath = path.join(__dirname, "./files", fileName);
//   try {
//     await fs.writeFile(filePath, content, "utf-8");
//     console.log(chalk.green(`File is created successfull`));
//   } catch (error) {
//     console.log(error);
//   }
// };

// const getFiles = async () => {
//   const pathFolder = path.join(__dirname, "./files");
//   const arrayFiles = await readdir(pathFolder);
//   if (!arrayFiles.length) {
//     console.log(chalk.red(`this folder is empty`));
//     return;
//   }
//   console.log(arrayFiles);
// };

// const getInfo = async (fileName) => {
//   const pathFolder = path.join(__dirname, "./files");
//   const arrayFiles = await fs.readdir(pathFolder);
//   const checkName = arrayFiles.includes(fileName);
//   if (!checkName) {
//     console.log(chalk.red(`this file ${fileName} is not found`));
//     return;
//   }
//   const pathFile = path.join(__dirname, "./files", fileName);
//   const text = await fs.readFile(pathFile, "utf-8");
//   console.log(text);

//   const ext = path.extname(fileName);
//   console.log(ext);

//   const base = path.basename(fileName, ext);
//   console.log(base);

//   const object = {
//     name: base,
//     extention: ext,
//     content: text,
//   };

//   console.log(object);
// };

// module.exports = {
//   createFile,
// getFiles,
// getInfo,
// };
