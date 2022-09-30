const fs = require("fs");
const path = require("path");

function findFileByExt(folderPath, ext) {
  try {
    const files = fs.readdirSync(folderPath);
    let newFilesPath = [];

    files.forEach(function (file) {
      const newbase = path.join(folderPath, file);
      newFilesPath.push(newbase);
    });

    return newFilesPath;
  } catch (error) {
    console.log(error);
  }

  // files.forEach(function (file) {
  //   const newbase = path.join(folderPath, file);
  //   if (fs.statSync(newbase).isDirectory()) {
  //     result = findFileByExt(newbase, ext, fs.readdirSync(newbase), result);
  //   } else {
  //     if (file.substring(-1 * (ext.length + 1)) == "." + ext) {
  //       result.push(newbase);
  //     }
  //   }
  // });
}

module.exports = findFileByExt;
