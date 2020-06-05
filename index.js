const express = require("express");
const port = 8000;

const app = express();

const db = require("./config/mongoose");

const expressLayouts = require("express-ejs-layouts");

app.use(expressLayouts);
app.use(express.static("assets"));

app.set("view engine", "ejs");
app.set("views", "./views");
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.error.bind(console, `Cannot run server on port: ${port}`);
    return;
  }
  console.log(`Successfully running server on port: ${port}`);
});
