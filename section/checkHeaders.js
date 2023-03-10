function checkHeader(headerUrl, headerName, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('HEAD', headerUrl);
    xhr.onload = function() {
      if (xhr.status === 200) {
        const headers = xhr.getAllResponseHeaders();
        if (headers.toLowerCase().indexOf(headerName.toLowerCase()) >= 0) {
          callback(parseHeaders(headers, headerName));
        } else {
          callback(null);
        }
      } else {
        callback(null);
      }
    };
    xhr.send();
}

function parseHeaders(headers, headerName) {
    const headerLines = headers.trim().split(/[\r\n]+/);
    for (let i = 0; i < headerLines.length; i++) {
      const headerLine = headerLines[i];
      const index = headerLine.indexOf(':');
      const name = headerLine.substr(0, index).trim().toLowerCase(); // Convert to lower case
      const value = headerLine.substr(index + 1).trim();
      if (name === headerName.toLowerCase()) { // Compare in lower case
        return value;
      }
    }
    return null;
}


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    
    var headerUrl = tabs[0].url;
    
    // Header Analysis Fields
    const statusCodeElement = document.querySelector('#statusCodeElement');
    const xframeOptionsResultElement = document.querySelector('#xframeOptionsResult');
    const cspResultElement = document.querySelector('#cspResult');
    const referrerPolicyResultElement = document.querySelector('#referrerPolicyResult');
    const permissionsPolicyResultElement = document.querySelector('#permissionsPolicyResult');
    const xssProtectionResultElement = document.querySelector('#xssProtectionResult');
    const contentTypeOptionsResultElement = document.querySelector('#contentTypeOptionsResult');
    const strictTransportSecurityResultElement = document.querySelector('#strictTransportSecurityResult');
    const serverResultElement = document.querySelector('#serverResult');


    // Fetching URL Status Codes
    fetch(headerUrl)
    .then(response => {
      const statusCode = response.status;
      if (statusCode) {
        const vulnerableStatusCodes = [203, 206, 226, 400,402,403,404,405,406,407,408,409,411,412,413,414,415,416,417,,421,422,423,424,426,428,429,431,451,500,501,502,503,504,505,507,508,510];
        if (vulnerableStatusCodes.includes(statusCode)) {
          // Display vulnerable status codes in red
          statusCodeElement.textContent = statusCode + ' Vulnerable';
          statusCodeElement.style.color = 'red';
        } else {
          // Display non-vulnerable status codes in green
          statusCodeElement.textContent = statusCode + ' OK';
          statusCodeElement.style.color = 'green';
        }
      } else {
        // Display non-vulnerable status codes in green if the status code is not present
        statusCodeElement.textContent = 'No Status Code';
        statusCodeElement.style.color = 'green';
      }
    })
    .catch(error => {
      console.error('Error fetching URL:', error);
    });

    // Checking X-frame options
    checkHeader(headerUrl, 'X-Frame-Options', function(value) {
        if (value) {
            xframeOptionsResultElement.textContent = value;
            xframeOptionsResultElement.style.color = 'green';
            xframeOptionsResultExplanation.textContent = "The X-Frame-Options header provides Clickjacking protection by preventing the web page from being displayed inside an iframe.";
        } else {
            xframeOptionsResultElement.textContent = 'Not Present - Vulnerable';
            xframeOptionsResultElement.style.color = 'red';
            xframeOptionsResultExplanation.textContent = "If the X-Frame-Options header is not present, the webpage may be vulnerable to Clickjacking attacks.";
        }
        
    });

    // Checking Content-Security-Policy
    checkHeader(headerUrl, 'Content-Security-Policy', function(value) {
        if (value) {
            cspResultElement.textContent = "Present";
            cspResultElement.style.color = 'green';
            cspResultExplanation.textContent = "If the Content-Security-Policy header is present, it helps to prevent attacks such as cross-site scripting (XSS) and clickjacking by specifying which resources are allowed to be loaded on the page.";
        } else {
            cspResultElement.textContent = 'Not Present - Vulnerable';
            cspResultElement.style.color = 'red';
            cspResultExplanation.textContent = "If the Content-Security-Policy header is not present, the webpage may be vulnerable to attacks such as cross-site scripting (XSS) and clickjacking, as there is no policy in place to restrict the loading of resources on the page.";
        }
    });

    // Checking Referrer-Policy
    checkHeader(headerUrl, 'Referrer-Policy', function(value) {
        if (value && value.includes('unsafe-url')) {
            referrerPolicyResultElement.textContent = value;
            referrerPolicyResultElement.style.color = 'red';
            referrerPolicyResultExplanation.textContent = "If the Referrer-Policy header contains the 'unsafe-url' directive, it can make the website vulnerable to attacks such as cross-site request forgery (CSRF), as it may leak sensitive information to third-party websites. It is recommended to use stricter directives such as 'no-referrer' or 'strict-origin-when-cross-origin'.";
        } else if (value) {
            referrerPolicyResultElement.textContent = value;
            referrerPolicyResultElement.style.color = 'green';
            referrerPolicyResultExplanation.textContent = "The Referrer-Policy header specifies how much referrer information should be included in requests made from the current page. It helps to protect against attacks such as CSRF and information leakage to third-party websites.";
        } else {
            referrerPolicyResultElement.textContent = 'Not Present - Vulnerable';
            referrerPolicyResultElement.style.color = 'red';
            referrerPolicyResultExplanation.textContent = "If the Referrer-Policy header is not present, the webpage may be vulnerable to attacks such as CSRF and information leakage to third-party websites, as there is no policy in place to control the amount of referrer information that is sent with requests.";
        }
    });

    // Checking Permissions-Policy
    checkHeader(headerUrl, 'Permissions-Policy', function(value) {
        if (value) {
            permissionsPolicyResultElement.textContent = value;
            permissionsPolicyResultElement.style.color = 'green';
            permissionsPolicyResultExplanation.textContent = "The Permissions-Policy header allows a website to specify which browser features are allowed to be used on the page, and by whom. It can help to prevent attacks such as clickjacking and code injection by limiting the permissions granted to third-party websites.";
        } else {
            permissionsPolicyResultElement.textContent = 'Not Present - Vulnerable';
            permissionsPolicyResultElement.style.color = 'red';
            permissionsPolicyResultExplanation.textContent = "If the Permissions-Policy header is not present, the webpage may be vulnerable to attacks such as clickjacking and code injection, as there is no policy in place to restrict the permissions granted to third-party websites.";
        }
    });

    // Checking X-XSS-Protection
    checkHeader(headerUrl, 'X-XSS-Protection', function(value) {
        if (value === '0') {
            xssProtectionResultElement.textContent = '0 - Vulnerable';
            xssProtectionResultElement.style.color = 'red';
            xssProtectionResultExplanation.textContent = 'Setting the X-XSS-Protection header to 0 can potentially make your website vulnerable to XSS attacks. This header instructs browsers to enable or disable the XSS auditor, which helps protect against some types of XSS attacks in older browsers.';
        } else if (value) {
            xssProtectionResultElement.textContent = value;
            xssProtectionResultElement.style.color = 'green';
            xssProtectionResultExplanation.textContent = 'The X-XSS-Protection header helps to protect against some types of XSS attacks in older browsers. This header instructs browsers to enable or disable the XSS auditor.';
        } else {
            xssProtectionResultElement.textContent = 'Not Present - Vulnerable';
            xssProtectionResultElement.style.color = 'red';
            xssProtectionResultExplanation.textContent = 'If the X-XSS-Protection header is not present, the website may be vulnerable to certain types of XSS attacks. This header instructs browsers to enable or disable the XSS auditor, which helps protect against some types of XSS attacks in older browsers.';
        }
    });

    // Checking X-Content-Type-Options
    checkHeader(headerUrl, 'X-Content-Type-Options', function(value) {
        if (value) {
            contentTypeOptionsResultElement.textContent = value;
            contentTypeOptionsResultElement.style.color = 'green';
            contentTypeOptionsResultExplanation.textContent = 'The X-Content-Type-Options header helps to prevent MIME sniffing attacks by instructing the browser to always use the declared content type. This can help prevent attacks that attempt to exploit content type inconsistencies in older browsers.';
        } else {
            contentTypeOptionsResultElement.textContent = 'Not Present - vulnerable';
            contentTypeOptionsResultElement.style.color = 'red';
            contentTypeOptionsResultExplanation.textContent = 'If the X-Content-Type-Options header is not present, the website may be vulnerable to MIME sniffing attacks in older browsers that can potentially lead to cross-site scripting (XSS) attacks.';
        }
    });

    // Checking for Strict-Transport-Security
    checkHeader(headerUrl, 'Strict-Transport-Security', function(value) {
        if (value) {
            var maxAge = parseInt(value.match(/max-age\s*=\s*(\d+)/i)[1]);
            if (maxAge < 31536000) {
                strictTransportSecurityResultElement.textContent = value + ' - vulnerable';
                strictTransportSecurityResultElement.style.color = 'red';
                strictTransportSecurityResultExplanation.textContent = 'A Strict-Transport-Security header with a max-age value of less than 31536000 seconds (1 year) can make the website vulnerable to certain types of attacks, such as SSL stripping. This header instructs browsers to only access the website over HTTPS, and to reject any attempts to access the website over HTTP.';
            } else {
                strictTransportSecurityResultElement.textContent = value;
                strictTransportSecurityResultElement.style.color = 'green';
                strictTransportSecurityResultExplanation.textContent = 'The Strict-Transport-Security header instructs browsers to only access the website over HTTPS, and to reject any attempts to access the website over HTTP. This helps to prevent certain types of attacks, such as SSL stripping.';
            }
        } else {
            strictTransportSecurityResultElement.textContent = 'Not Present - vulnerable';
            strictTransportSecurityResultElement.style.color = 'red';
            strictTransportSecurityResultExplanation.textContent = 'If the Strict-Transport-Security header is not present, the website may be vulnerable to certain types of attacks, such as SSL stripping. This header instructs browsers to only access the website over HTTPS, and to reject any attempts to access the website over HTTP.';
        }
    });

    // Checking Server Headers
    checkHeader(headerUrl, 'Server', function(value) {
        if (!value) {
            serverResultElement.textContent = 'Not Present - vulnerable';
            serverResultElement.style.color = 'red';
            serverResultExplanation.textContent = 'If the Server header is not present, it may be more difficult for attackers to determine what software is running on the server. However, this should not be relied upon as a security measure.';
        } else if (/(\d+\.\d+)/.test(value)) {
            serverResultElement.textContent = value + ' - vulnerable';
            serverResultElement.style.color = 'red';
            serverResultExplanation.textContent = 'The Server header should not reveal specific version information, as this can be used by attackers to find known vulnerabilities in that version.';
        } else {
            serverResultElement.textContent = value;
            serverResultElement.style.color = 'green';
            serverResultExplanation.textContent = 'The Server header is not revealing specific version information.';
        }
    });

});