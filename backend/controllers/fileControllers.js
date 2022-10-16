const uploadFile = require("../middleware/upload");
const findFileByExt = require("../utils/findFileByExt");
const Product = require("../models/Product");
const fs = require("fs");

const { convertJSON } = require("../utils/excelUtils");

exports.processExcelFile = async (req, res) => {
  const pdfPath = "resources/static/assets/downloads/document.pdf";

  if (fs.existsSync(pdfPath)) {
    fs.unlinkSync("resources/static/assets/downloads/document.pdf");
  }

  const messages = [];
  const errors = [];

  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      errors.push("No file uploaded");
    }

    messages.push(`Uploaded the file successfully ${req.file.originalname}`);

    let excelFileFound = "";
    const path = "resources/static/assets/uploads/";
    const fileExists = findFileByExt(path);
    console.log("line 22", fileExists);
    fileExists.forEach((file) => {
      if (file.endsWith(".xlsx")) {
        excelFileFound = file;
        console.log("line 26 Excel found");
        messages.push(`Excel file found ${file}`);
      } else {
        errors.push(`${file} is not an excel file`);
      }
    });

    let excelJSON = [];

    if (excelFileFound !== "") {
      messages.push(`${excelFileFound} is used`);
      try {
        excelJSON = await convertJSON(excelFileFound);
      } catch (error) {
        console.log(error);
      }
    } else if (excelFileFound === "") {
      errors.push("No excel file found");
    }

    const productCodes = excelJSON.map((item) => {
      return item["Product Code"];
    });

    // console.log("productCodeLength", productCodes);

    let records = [];

    if (excelJSON.length !== 0) {
      try {
        records = await Product.find(
          {
            productCode: { $in: productCodes },
          },
          { productCode: 1, description: 1, oum: 1, brand: 1 }
        );
      } catch (error) {
        console.log(error);
      }
    }

    // re-arrange database records to excel records

    const arrayMap = records.reduce(
      (accumulator, currentValue) => ({
        ...accumulator,
        [currentValue.productCode]: currentValue,
      }),
      {}
    );
    const sortedRecords = productCodes.map((key) =>
      arrayMap[key]
        ? arrayMap[key]
        : {
            productCode: key,
            description: undefined,
            oum: undefined,
            brand: undefined,
          }
    );

    // End -- Rearrange list after get result from db

    if (sortedRecords.length !== 0) {
      const createPdf = require("../utils/pdfTable");
      await createPdf(sortedRecords);
    }

    // if (excelFileFound !== "") {
    //   const cell = convertJSON(excelFileFound);
    //   console.log("line 35", cell);
    //   try {
    //     const doc = await createTable();
    //     // console.log(doc);
    //     console.log("line 39 processExcel Jalan");
    //     doc.end();
    //   } catch (err) {
    //     console.log("line 42", err);
    //   }
    // } else {
    //   console.log("line 45 No file Found");
    // }
    res.status(200).json({ messages, errors });
  } catch (error) {
    res.status(500).json({ message: "Problem occured" });
  }
};
