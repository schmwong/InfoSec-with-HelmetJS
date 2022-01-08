## [Introduction to Information Security with HelmetJS Challenges]

(https://www.freecodecamp.org/learn/information-security/information-security-with-helmetjs/)

### 1. Install and Require Helmet

<details>
<summary>
Install Helmet version 3.21.3, then require it. 
</summary>
You can install a specific version of a package with

_npm install --save-exact package@version_,
or by adding it to your **package.json** directly.

Solution: run _npm i helmet@3.21.3_ in terminal, then initialise helmet in **myApp.js** accordingly.

</details>

### 2. Hide Potentially Dangerous Information Using helmet.hidePoweredBy()

<details>
<summary>
Hackers can exploit known vulnerabilities in Express/Node if they see that your site is powered by Express.
</summary>

_X-Powered-By: Express_ is sent in every request coming from Express by default. Use the _helmet.hidePoweredBy()_ middleware to remove the X-Powered-By header.

Solution: enclose the _hidePoweredBy()_ function within _app.use( )_ to invoke it

</details>
