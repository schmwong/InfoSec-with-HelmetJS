const express = require("express");
const app = express();

/* -- 1. Install and Require Helmet to be Included -- */
let helmet = require("helmet");

//
/* -- 2. Hide Potentially Dangerous Information - `helmet.hidePoweredBy()` -- */
// Optional: add `{setTo: " "}` object in `hidePoweredBy()` argument
// to replace header value Express with a spoof of your choice
app.use(helmet.hidePoweredBy({ setTo: "PHP 4.2.0" }));

//
/* -- 3. Mitigate the Risk of Clickjacking - `helmet.frameguard()` -- */
// passing to it the configuration object `{ action: "deny"}`
app.use(helmet.frameguard({ action: "deny" }));

//
/* -- 4. Mitigate the Risk of Cross Site Scripting (XSS) Attacks - helmet.xssFilter() -- */
app.use(helmet.xssFilter({}));

//
/* -- 5. Avoid Inferring the Response MIME Type - helmet.noSniff() -- */
app.use(helmet.noSniff());

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
