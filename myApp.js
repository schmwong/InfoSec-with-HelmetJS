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

//
/* -- 6. Prevent Internet Explorer users from downloading in *trusted* site's context -- */
app.use(helmet.ieNoOpen());

//
/* -- 7. Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts() -- */
var ninetyDaysInSeconds = 90 * 24 * 60 * 60;

app.use(
  helmet.hsts({
    maxAge: ninetyDaysInSeconds,
    force: true
  })
);

//
/* -- 8. Disable DNS Prefetching with helmet.dnsPrefetchControl() -- */
app.use(helmet.dnsPrefetchControl());

//
/* -- 9. Disable Client-Side Caching with helmet.noCache() -- */
app.use(helmet.noCache());

//
/* -- 10. Set a Content Security Policy with helmet.contentSecurityPolicy() -- */
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"]
    scriptSrc: ["'self'", "trusted-cdn.com"]
  }
}));



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
