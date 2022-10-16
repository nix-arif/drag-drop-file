const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const uri = process.env.CONNECTION_STRING;

mongoose
  .connect(uri)
  .then(() => {
    console.log("DB connected");
    const app = require("./app");
    app.listen(5000, () => {
      console.log("Server is listening");
    });
  })
  .catch((err) => console.log(err));
