const uploadFile = require("../middleware/upload");
const findFileByExt = require("../utils/findFileByExt");

const { convertJSON } = require("../utils/excelUtils");

const fs = require("fs");
const createTable = require("../utils/pdfTable");

exports.processExcelFile = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).json({ message: "Please upload a file!" });
    }

    const path = "resources/static/assets/uploads/";

    let excelFileFound = "";

    const fileExists = findFileByExt(path);
    console.log(fileExists);
    fileExists.forEach((file) => {
      if (file.endsWith(".xlsx")) {
        excelFileFound = file;
      }
    });

    if (excelFileFound !== "") {
      const cell = convertJSON(excelFileFound);
      console.log(cell);
      createTable();
    } else {
      console.log("No file Found");
    }

    // const excelFile = require("../resources/static/assets/uploads/ERBE Spare Part List with Price VIO300S.xlsx");

    res.status(200).json({
      message: `Uploaded the file successfully ${req.file.originalname}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Problem occured" });
  }
};
