const express = require("express");
const app = express();

/* -- 1. Install and Require Helmet -- */
let helmet = require("helmet");

//
/* -- 2. Hide Potentially Dangerous Information Using helmet.hidePoweredBy() -- */
// Optional: add {setTo: " "} object in hidePoweredBy() argument
// to replace Express with a spoof object of your choice

app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" }));

module.exports = app;
const api = require("./server.js");
app.use(express.static("public"));
app.disable("strict-transport-security");
app.use("/_api", api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + "/views/index.html");
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
