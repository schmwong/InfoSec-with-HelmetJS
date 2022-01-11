## [Introduction to Information Security with HelmetJS Challenges](https://www.freecodecamp.org/learn/information-security/information-security-with-helmetjs/)

#### All assignments are done in the myApp.js file.

### 1. Install and Require Helmet to be Included

<details>
<summary>
Install Helmet version 3.21.3, then require it. 
</summary>
<br>
You can install a specific version of a package with <br>
`npm install --save-exact package@version`,
or by adding it to your **package.json** directly.

> Solution: run `npm i helmet@3.21.3` in terminal, then initialise helmet in **myApp.js** accordingly.

</details>

### 2. Hide Potentially Dangerous Information Using helmet.hidePoweredBy()

<details>
<summary>
<br>
Hackers can exploit known vulnerabilities in Express/Node if they see that your site is powered by Express.
</summary>

_X-Powered-By: Express_ is sent in every request coming from Express by default. Use the _helmet.hidePoweredBy()_ middleware to remove the X-Powered-By header.

[ How to view headers in browser DevTools](https://www.geeksforgeeks.org/node-js-securing-apps-with-helmet-js/)

- Right-click anywhere on the live webpage, select **Inspect Element**, then navigate to the **Network** tab.
- Refresh the webpage, then select the item in the **Name** list that has the same name as the page URL (it's usually the first item).
- Refresh the webpage after saving changes in myApp.js. It might take a while for the headers to update due to FreeCodeCamp's backend.

Solution: enclose the `hidePoweredBy()` method within `app.use( )` to invoke it.

Optional: add configuration object `{ setTo: PHP 4.2.0 }` to change the **X-Powered-By** header value instead of hiding it.

When done successfully, the header should be hidden or altered as shown:

![Updated X-Powered-By header shown in Developer Tools](https://github.com/schmwong/InfoSec-with-HelmetJS/blob/main/screenshots/02_x-powered-by%20header.png)

</details>

### 3. Mitigate the Risk of Clickjacking with helmet.frameguard()

<details>
<summary>
This middleware sets the X-Frame-Options header. It restricts who can put your site in a frame. It has three modes: DENY, SAMEORIGIN, and ALLOW-FROM.
</summary>
<br>
Clickjacking is a technique of tricking a user into interacting with a page different from what the user thinks it is. This can be obtained executing your page in a malicious context, by means of iframing. In that context a hacker can put a hidden layer over your page. Hidden buttons can be used to run bad scripts.

Your page could be put in a _<frame>_ or _<iframe>_ without your consent.

We don’t need our app to be framed.

Use `helmet.frameguard()` passing with the configuration object `{ action: 'deny' }`.

After refreshing the live webpage, the **X-Frame-Options** header should appear as shown:

![X-Frame-Options header shown in Developer Tools](https://github.com/schmwong/InfoSec-with-HelmetJS/blob/main/screenshots/03_x-frame-options%20header.png)

</details>

### 4. Mitigate the Risk of Cross Site Scripting (XSS) Attacks with helmet.xssFilter()

<details>
<summary>
Cross-site scripting (XSS) is a frequent type of attack where malicious scripts are injected into vulnerable pages, with the purpose of stealing sensitive data like session cookies, or passwords.
</summary>
<br>
The basic rule to lower the risk of an XSS attack is simple: “Never trust user’s input”. As a developer you should always sanitize all the input coming from the outside. This includes data coming from forms, GET query urls, and even from POST bodies. Sanitizing means that you should find and encode the characters that may be dangerous e.g. <, >.

Modern browsers can help mitigating the risk by adopting better software strategies. Often these are configurable via http headers.

The X-XSS-Protection HTTP header is a basic protection. The browser detects a potential injected script using a heuristic filter. If the header is enabled, the browser changes the script code, neutralizing it. It still has limited support.

Solution: enclose the `helmet.xssFilter()` method within `app.use( )`

The **X-XSS-Protection header** will appear with the value **1; mode=block** (i.e. the browser will prevent rendering of the page if an attack is detected) as shown:

![X-XSS-Protection header shown in Developer Tools](https://github.com/schmwong/InfoSec-with-HelmetJS/blob/main/screenshots/04_x-xss-protection%20header.png)

</details>

### 5. Avoid Inferring the Response MIME Type with helmet.noSniff()

<details>
<summary>
Browsers can use content or MIME sniffing to override response **Content-Type** headers to guess and process the data using an implicit content type.

While this can be convenient in some scenarios, it can also lead to some dangerous attacks.

</summary>
<br>
This middleware sets the **X-Content-Type-Options** header to **noSniff**, instructing the browser to not bypass the provided Content-Type.

Solution: Use the `helmet.noSniff()` method on your server &#8212 enclose it within `app.use( )`.

The **X-Content-Type-Options** header will appear as shown:

![X-Content-Type-Options header shown in Developer Tools](https://github.com/schmwong/InfoSec-with-HelmetJS/blob/main/screenshots/05_x-content-type-options%20header.png)

</details>
