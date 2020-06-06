const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/codeial");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Cannot connect to mongodb"));

db.once("open", function () {
  console.log("Successfully connected to mongodb");
});

module.exports = db;
