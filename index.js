const express = require("express");
const morgan = require("morgan");
const router = require("./router");

const app = express();

app.use(morgan("tiny"));

app.use(express.json());

app.use("/files", router);

app.listen(3000, () => {
  console.log("Server is started");
});

// const argv = require('yargs').argv;
// const { createFile, getFiles, getInfo } = require("./files.js");

// function invokeAction({ action, fileName, content }) {
//   switch (action) {
//     case "create":
//       createFile(fileName, content);

//       break;

//     case "get":
//       getFiles();
//       break;

//     case "getInfo":
//       getInfo(fileName);
//       break;

//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// }

// invokeAction(argv);
