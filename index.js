const express = require("express");
const port = 8000;

const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/codeial");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Cannot connect to db"));
db.once("open", function () {
  console.log("Successfully connected to db");
});
// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.error.bind(console, `Cannot run server on port: ${port}`);
    return;
  }
  console.log(`Successfully running server on port: ${port}`);
});
