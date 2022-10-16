const XLSX = require("xlsx");

exports.convertJSON = function (file) {
  return new Promise(function (resolve, reject) {
    try {
      const wb = XLSX.readFile(file);
      const ws = wb.Sheets[wb.SheetNames[1]];
      const resultJSON = XLSX.utils.sheet_to_json(ws);
      resolve(resultJSON);
    } catch (error) {
      reject(error);
    }
  });
};

// exports.isReadableStream = function (obj) {
//   return (
//     obj instanceof stream.Stream &&
//     typeof (obj._read === "function") &&
//     typeof (obj._readableState === "object")
//   );
// };
