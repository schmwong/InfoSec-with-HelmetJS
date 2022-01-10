## [Introduction to Information Security with HelmetJS Challenges](https://www.freecodecamp.org/learn/information-security/information-security-with-helmetjs/)

### 1. Install and Require Helmet

<details>
<summary>
Install Helmet version 3.21.3, then require it. 
</summary>
You can install a specific version of a package with

_npm install --save-exact package@version_,
or by adding it to your **package.json** directly.

Solution: run `npm i helmet@3.21.3` in terminal, then initialise helmet in **myApp.js** accordingly.

</details>

### 2. Hide Potentially Dangerous Information Using helmet.hidePoweredBy()

<details>
<summary>
Hackers can exploit known vulnerabilities in Express/Node if they see that your site is powered by Express.
</summary>

_X-Powered-By: Express_ is sent in every request coming from Express by default. Use the _helmet.hidePoweredBy()_ middleware to remove the X-Powered-By header.

####[How to view headers in browser DevTools](https://www.geeksforgeeks.org/node-js-securing-apps-with-helmet-js/)

- Right-click anywhere on the live webpage, select **Inspect Element**, then navigate to the **Network** tab.
- Refresh the webpage, then select the item in the **Name** list that has the same name as the page URL (it's usually the first item).
- Refresh the webpage after saving changes in myApp.js. It might take a while for the headers to update due to FreeCodeCamp's backend.

Solution: enclose the `hidePoweredBy()` function within `app.use( )` to invoke it.

Optional: add configuration object `{ setTo: PHP 4.2.0 }` to change the X-Powered-By header value instead of hiding it.

When done successfully, the header should be hidden or altered as shown:

![Updated X-Powered-By header shown in Developer Tools](https://github.com/schmwong/InfoSec-with-HelmetJS/blob/main/screenshots/03_x-powered-by%20header.png)

</details>

### 3. Mitigate the Risk of Clickjacking with helmet.frameguard()

<details>
<summary>
This middleware sets the X-Frame-Options header. It restricts who can put your site in a frame. It has three modes: DENY, SAMEORIGIN, and ALLOW-FROM.
</summary>
Clickjacking is a technique of tricking a user into interacting with a page different from what the user thinks it is. This can be obtained executing your page in a malicious context, by means of iframing. In that context a hacker can put a hidden layer over your page. Hidden buttons can be used to run bad scripts.

Your page could be put in a _<frame>_ or _<iframe>_ without your consent.

We don’t need our app to be framed.

Use `helmet.frameguard()` passing with the configuration object `{ action: 'deny' }`.

After refreshing the live webpage, x-frame-options header should appear as shown:

![X-Frame-Options header shown in Developer Tools](https://github.com/schmwong/InfoSec-with-HelmetJS/blob/main/screenshots/04_x-frame-options%20header.png)

</details>
