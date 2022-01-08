const express = require("express");
const app = express();

// Install Helmet version 3.21.3,
// then require it. You can install
// a specific version of a package with
// npm install --save-exact package@version,
// or by adding it to your package.json directly.
let helmet = require("helmet");

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
