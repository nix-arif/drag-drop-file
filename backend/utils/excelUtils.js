const XLSX = require("xlsx");

exports.convertJSON = function (file) {
  try {
    console.log(file);
    const wb = XLSX.readFile(file);
    const cell = wb.Sheets["Table 1"]["C3"].v;
    return cell;
  } catch (error) {
    return error;
  }
};

// exports.isReadableStream = function (obj) {
//   return (
//     obj instanceof stream.Stream &&
//     typeof (obj._read === "function") &&
//     typeof (obj._readableState === "object")
//   );
// };
