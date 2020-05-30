const express = require("express");
const port = 8000;

const app = express();

// use express router
app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) {
    console.error.bind(console, `Cannot run server on port: ${port}`);
    return;
  }
  console.log(`Successfully running server on port: ${port}`);
});
