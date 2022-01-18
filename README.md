## [Introduction to Information Security with HelmetJS Challenges](https://www.freecodecamp.org/learn/information-security/information-security-with-helmetjs/)

#### All assignments are done in the myApp.js file.

### 1. Install and Require Helmet to be Included

<details>
<summary>
Install Helmet version 3.21.3, then require it. 
</summary>
<br>
You can install a specific version of a package with

`npm install --save-exact package@version`,
or by adding it to your **package.json** directly.

> Solution: run `npm i helmet@3.21.3` in terminal, then initialise helmet in **myApp.js** accordingly.

</details>

### 2. Hide Potentially Dangerous Information Using helmet.hidePoweredBy()

<details>
<summary>
Hackers can exploit known vulnerabilities in Express/Node if they see that your site is powered by Express.
</summary>
<br>

_X-Powered-By: Express_ is sent in every request coming from Express by default. Use the `helmet.hidePoweredBy()` middleware to remove the **X-Powered-By** header. <br>

> > [ How to view headers in browser DevTools](https://www.geeksforgeeks.org/node-js-securing-apps-with-helmet-js/)
> >
> > - Right-click anywhere on the live webpage, select **Inspect Element**, then navigate to the **Network** tab.
> > - Refresh the webpage, then select the item in the **Name** list that has the same name as the page URL (it's usually the first item).
> > - Refresh the webpage after saving changes in myApp.js. It might take a while for the headers to update due to FreeCodeCamp's backend.
> >
> >   Solution: enclose the `hidePoweredBy()` method within `app.use( )` to invoke it.
>
> Optional: add configuration object `{ setTo: PHP 4.2.0 }` to change the **X-Powered-By** header value instead of hiding it.
>
> When done successfully, the header should be hidden or altered as shown:
>
> ![Updated X-Powered-By header shown in Developer Tools](https://github.com/schmwong/InfoSec-with-HelmetJS/blob/main/screenshots/02_x-powered-by%20header.png)

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
Browsers can use content or MIME sniffing to override

response **Content-Type** headers to guess and process the data using an implicit content type.

While this can be convenient in some scenarios, it can also lead to some dangerous attacks.

</summary>
<br>

This middleware sets the **X-Content-Type-Options** header to **noSniff**, instructing the browser to not bypass the provided Content-Type.

> Solution: Use the `helmet.noSniff()` method on your server — enclose it within `app.use( )`.
>
> The **X-Content-Type-Options** header will appear as shown:
>
> ![X-Content-Type-Options header shown in Developer Tools](https://github.com/schmwong/InfoSec-with-HelmetJS/blob/main/screenshots/05_x-content-type-options%20header.png)

</details>

### 6. Prevent IE from Opening Untrusted HTML with helmet.ieNoOpen()

<details>
<summary>
Some web applications will serve untrusted HTML for download. Some versions of Internet Explorer by default open those HTML files in the context of your site. This means that an untrusted HTML page could start doing bad things in the context of your pages. 
</summary>
<br>

This middleware sets the **X-Download-Options** header to **ieNoOpen**. This will prevent IE users from executing downloads in the trusted site’s context.

> Solution: enclose the `helmet.ieNoOpen()` method within `app.use( )`
>
> The **X-Download-Options** header will appear as shown:
>
> ![X-Download-Options header shown in Developer Tools](https://github.com/schmwong/InfoSec-with-HelmetJS/blob/main/screenshots/06_x-download-options%20header.png)

</details>

### 7. Ask Browsers to Access Your Site via HTTPS Only with helmet.hsts()

<details>
<summary>
HTTP Strict Transport Security (HSTS) is a web security policy which helps to protect websites against protocol downgrade attacks and cookie hijacking. 
</summary>
<br>
If your website can be accessed via HTTPS you can ask user’s browsers to avoid using insecure HTTP.

By setting the header **Strict-Transport-Security**, you tell the browsers to use HTTPS for the future requests in a specified amount of time. This will work for the requests coming after the initial request.

Configure `helmet.hsts()` to use HTTPS for the next 90 days. Pass the config object `{ maxAge: timeInSeconds, force: true }`. You can create a variable `ninetyDaysInSeconds = 90*24*60*60;` to use for the `timeInSeconds`. Replit already has hsts enabled. To override its settings you need to set the field "force" to true in the config object. We will intercept and restore the Replit header, after inspecting it for testing.

Note: Configuring HTTPS on a custom website requires the acquisition of a domain, and a SSL/TLS Certificate.

> Solution:
>
> - Create and initialise the variable `var ninetyDaysInSeconds` as shown in the instructions.
> - On a new line, enclose the `helmet.hsts()` method within `app.use( )`
> - Pass the configuration object containing two properties, `maxAge: ninetyDaysInSeconds` and `force: true`.
>
> The **Strict-Transport-Security** header should appear with the **maxAge** value of **7776000s** as shown:
>
> ![X-Download-Options header shown in Developer Tools](https://github.com/schmwong/InfoSec-with-HelmetJS/blob/main/screenshots/07_strict-transport-security%20header.png)

</details>

### 8. Disable DNS Prefetching with helmet.dnsPrefetchControl()

<details>
<summary>
To improve performance, most browsers prefetch DNS records for the links in a page. In that way the destination IP is already known when the user clicks on a link. This may lead to over-use of the DNS service 
</summary>

(if you own a big website, visited by millions people…), privacy issues (one eavesdropper could infer that you are on a certain page), or page statistics alteration (some links may appear visited even if they are not).

If you have high security needs you can disable DNS prefetching, at the cost of a performance penalty.

Use the `helmet.dnsPrefetchControl()` method on your server.

> Solution: Solution: enclose the `helmet.dnsPrefetchControl()` method within `app.use( )`
>
> The **X-DNS-Prefetch-Control** header will appear as shown:
>
> ![X-Download-Options header shown in Developer Tools](https://github.com/schmwong/InfoSec-with-HelmetJS/blob/main/screenshots/08_x-dns-prefetch-control%20header.png)

</details>

### 9. Disable Client-Side Caching with helmet.noCache()

<details>
<summary>
If you are releasing an update for your website, and you want the users to always download the newer version, you can (try to) disable caching on client’s browser. 
</summary>
<br>
It can be useful in development too. Caching has performance benefits, which you will lose, so only use this option when there is a real need.

Use the `helmet.noCache()` method on your server.

> Solution: Solution: enclose the `helmet.noCache()` method within `app.use( )`
>
> The **Pragma** header appears and the **Cache-Control** header will have its values changed to **no-store, no-cache, must-revalidate, proxy-revalidate** as shown:
>
> ![Pragma and Cache-Control headers shown in Developer Tools](https://github.com/schmwong/InfoSec-with-HelmetJS/blob/main/screenshots/09_pragma%20and%20cache-control%20headers.png)

</details>

### 10. Set a Content Security Policy with helmet.contentSecurityPolicy()

<details>
<summary>
This challenge highlights one promising new defense that can significantly reduce the risk and impact of many type of attacks in modern browsers. By setting and configuring a Content Security Policy you can prevent the injection of anything unintended into your page.

This will protect your app from XSS vulnerabilities, undesired tracking, malicious frames, and much more.

</summary>
<br>
CSP works by defining an allowed list of content sources which are trusted. You can configure them for each kind of resource a web page may need (scripts, stylesheets, fonts, frames, media, and so on…).

There are multiple directives available, so a website owner can have a granular control. See HTML 5 Rocks, KeyCDN for more details. Unfortunately, CSP is unsupported by older browsers.

By default, directives are wide open, so it’s important to set the defaultSrc directive as a fallback. Helmet supports both defaultSrc and default-src naming styles. The fallback applies for most of the unspecified directives.

In this exercise, use `helmet.contentSecurityPolicy()`. Configure it by adding a directives object. In the object, set the `defaultSrc` to `["'self'"]` (the list of allowed sources must be in an array), in order to trust only your website address by default. Also set the scriptSrc directive so that you only allow scripts to be downloaded from your website (`'self'`), and from the domain `'trusted-cdn.com'`.

Hint: in the `'self'` keyword, the single quotes are part of the keyword itself, so it needs to be enclosed in double quotes to be working.

> Solution:

> - Enclose the `helmet.contentSecurityPolicy()` method within `app.use( )`
> - Pass the `directives` configuration object containing two properties, <br> `defaultSrc: ["'self'"]` and <br> `scriptSrc: ["'self'", "trusted-cdn.com"]`.
> The **Content-Security-Policy** header will appear as shown:
>
> ![Content-Security-Policy header shown in Developer Tools](https://github.com/schmwong/InfoSec-with-HelmetJS/blob/main/screenshots/10_content-security-policy%20header.png)

</details>

### 11. Configure Helmet Using the ‘parent’ helmet() Middleware

<details>
<summary>

`app.use(helmet());` will automatically include all the middleware introduced above, except `noCache()`, and `contentSecurityPolicy()`, but these can be enabled if necessary. You can also disable or configure any other middleware individually, using a configuration object.


**Example:**
``` javascript
app.use(helmet({
  frameguard: {         // configure
    action: 'deny'
  },
  contentSecurityPolicy: {    // enable and configure
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ['style.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))
```

We introduced each middleware separately for teaching purposes and for ease of testing. Using the ‘parent’ `helmet()` middleware is easy to implement in a real project.

</summary>

> Solution: 
>
``` javascript
app.use(helmet({
  frameguard: {        
    action: 'deny'
  },
  hidePoweredBy: {
    setTo:"PHP 4.2.0"
    },
  noCache: true,
  hsts: {
    maxAge: ninetyDaysInSeconds,
    force: true
  },
  contentSecurityPolicy: {    
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ['trusted-cdn.com'],
    }
  },
  dnsPrefetchControl: false     // disable
}))
```
>
> Comment out or delete the solutions for the previous questions to test this out. <br>
The response headers should remain unchanged.
</details>