const fs = require("fs");
const PDFDocument = require("pdfkit-table");

const tableHeader = [
  "No",
  "Product Code",
  "Description",
  "Qty",
  "OUM",
  "Price/Unit",
  "Price",
];

// const tableContent = [
//   [
//     1,
//     "18-0230",
//     'Yankauer Suction Tube, 10mm tip diameter, dismantable tip, 6mm diam tube, s/steel, 295mm, 11 1/2"',
//     1,
//     "pc",
//     723,
//     723,
//   ],
//   [
//     2,
//     "CD3-6B",
//     'GENESIS Sterilization Full-Length container, perforated bottom, hard-coated anodized aluminium, with 2 ID tags, 23" x 12" x 6" (58.4cm x 30.5cm x 15.2cm).',
//     1,
//     "pc",
//     3130,
//     3130,
//   ],
//   [
//     3,
//     "06.00.13",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
//   [
//     1,
//     "18-0230",
//     'Yankauer Suction Tube, 10mm tip diameter, dismantable tip, 6mm diam tube, s/steel, 295mm, 11 1/2"',
//     1,
//     "pc",
//     723,
//     723,
//   ],
//   [
//     1,
//     "18-0230",
//     'Yankauer Suction Tube, 10mm tip diameter, dismantable tip, 6mm diam tube, s/steel, 295mm, 11 1/2"',
//     1,
//     "pc",
//     723,
//     723,
//   ],
//   [
//     1,
//     "18-0230",
//     'Yankauer Suction Tube, 10mm tip diameter, dismantable tip, 6mm diam tube, s/steel, 295mm, 11 1/2"',
//     1,
//     "pc",
//     723,
//     723,
//   ],
//   [
//     1,
//     "18-0230",
//     'Yankauer Suction Tube, 10mm tip diameter, dismantable tip, 6mm diam tube, s/steel, 295mm, 11 1/2"',
//     1,
//     "pc",
//     723,
//     723,
//   ],
//   [
//     2,
//     "CD3-6B",
//     'GENESIS Sterilization Full-Length container, perforated bottom, hard-coated anodized aluminium, with 2 ID tags, 23" x 12" x 6" (58.4cm x 30.5cm x 15.2cm).',
//     1,
//     "pc",
//     3130,
//     3130,
//   ],
//   [
//     3,
//     "06.00.13",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
//   [
//     2,
//     "CD3-6B",
//     'GENESIS Sterilization Full-Length container, perforated bottom, hard-coated anodized aluminium, with 2 ID tags, 23" x 12" x 6" (58.4cm x 30.5cm x 15.2cm).',
//     1,
//     "pc",
//     3130,
//     3130,
//   ],
//   [
//     3,
//     "06.00.13",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
//   [
//     2,
//     "CD3-6B",
//     'GENESIS Sterilization Full-Length container, perforated bottom, hard-coated anodized aluminium, with 2 ID tags, 23" x 12" x 6" (58.4cm x 30.5cm x 15.2cm).',
//     1,
//     "pc",
//     3130,
//     3130,
//   ],
//   [
//     3,
//     "06.00.13",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
//   [
//     2,
//     "CD3-6B-GOLD",
//     'GENESIS Sterilization Full-Length container, perforated bottom, hard-coated anodized aluminium, with 2 ID tags, 23" x 12" x 6" (58.4cm x 30.5cm x 15.2cm).',
//     1,
//     "pc",
//     3130,
//     3130,
//   ],
//   [
//     3,
//     "26-0001-01.",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
//   [
//     3,
//     "06.00.13",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
//   [
//     3,
//     "06.00.13",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
//   [
//     3,
//     "06.00.13",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
//   [
//     3,
//     "06.00.13",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
//   [
//     3,
//     "06.00.13",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
//   [
//     3,
//     "06.00.13",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
//   [
//     3,
//     "06.00.13",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
//   [
//     3,
//     "06.00.13",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
//   [
//     3,
//     "06.00.13",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
//   [
//     3,
//     "06.00.13",
//     'Standard dressing forceps, serrated jaws, straight, s/steel, 130mm, 5 1/8"',
//     1,
//     "pc",
//     120,
//     120,
//   ],
// ];

const createPdf = function (records) {
  return new Promise((resolve, reject) => {
    let doc = new PDFDocument({
      margins: {
        top: 200,
        bottom: 20,
        left: 30,
        right: 30,
      },
      size: "A4",
      autoFirstPage: false,
    });

    doc.pipe(
      fs.createWriteStream("resources/static/assets/downloads/document.pdf")
    );

    (async function createTable() {
      //   [
      //     1,
      //     "18-0230",
      //     'Yankauer Suction Tube, 10mm tip diameter, dismantable tip, 6mm diam tube, s/steel, 295mm, 11 1/2"',
      //     1,
      //     "pc",
      //     723,
      //     723,
      //   ],

      const tableContent = records.map((record, index) => [
        index + 1,
        record.productCode,
        record.description ? record.description : "Xtau",
        1,
        record.oum ? record.oum : "Xtau",
        1200,
        1200,
      ]);

      doc.on("pageAdded", () => {
        // doc.image("logo.png", 0, 0, { width: 300 });
        // console.log(doc.fontSize(8));
        doc.text(
          "Hospital Sultanah Aminah\nPersiaran Abu Bakar Sultan\n80100 Johor Bahru",
          doc.x,
          100
        );
        doc.moveDown();
        doc.text("Attn: MA Zamzuri\n");
        doc.moveDown();
      });

      doc.addPage();
      const table = {
        title: "",
        headers: tableHeader,
        data: [],
        rows: tableContent,
      };

      try {
        await doc.table(table, {
          columnsSize: [30, 70, 230, 30, 30, 70, 70],
        });
        doc.end();
      } catch (error) {
        console.log(error);
      }
    })();
  });
};

module.exports = createPdf;
