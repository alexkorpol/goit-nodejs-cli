const checkExtention = (fileName) => {
  const EXTENTIONS = ["txt", "js", "json", "html", "css"];
  const check = fileName.split(".");
  const result = EXTENTIONS.includes(check[check.length - 1]);
  return { extention: check[check.length - 1], result };
};

module.exports = checkExtention;

// fileName = index.html;
// re
