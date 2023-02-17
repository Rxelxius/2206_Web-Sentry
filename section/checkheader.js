function checkHeader(url, headerName, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('HEAD', url);
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


document.addEventListener('DOMContentLoaded', function() {
  const urlInput = document.querySelector('#urlInput');
  const checkButton = document.querySelector('#checkButton');
  const cspResultElement = document.querySelector('#cspResult');
  const xcspResultElement = document.querySelector('#xcspResult');
  const xwebkitcspResultElement = document.querySelector('#xwebkitcspResult');
  const xframeOptionsResultElement = document.querySelector('#xframeOptionsResult');
  const xssProtectionResultElement = document.querySelector('#xssProtectionResult');
  const contentTypeOptionsResultElement = document.querySelector('#contentTypeOptionsResult');
  const strictTransportSecurityResultElement = document.querySelector('#strictTransportSecurityResult');
  const permittedCrossDomainPolicyResultElement = document.querySelector('#permittedCrossDomainPolicyResult');
  //
  const accessControlAllowOriginResultElement = document.querySelector('#accessControlAllowOriginResult');
  const xForwardedForResultElement = document.querySelector('#xForwardedForResult');
  const serverResultElement = document.querySelector('#serverResult');
  const viaResultElement = document.querySelector('#viaResult');
  const setCookieResultElement = document.querySelector('#setCookieResult');


  checkButton.addEventListener('click', function() {
    const url = urlInput.value;
    checkHeader(url, 'X-Frame-Options', function(value) {
      xframeOptionsResultElement.textContent = value || 'not present';
    });
    checkHeader(url, 'Content-Security-Policy', function(value) {
      cspResultElement.textContent = value || 'not present';
    });
    checkHeader(url, 'X-Content-Security-Policy', function(value) {
      xcspResultElement.textContent = value || 'not present';
    });
    checkHeader(url, 'X-Webkit-CSP', function(value) {
      xwebkitcspResultElement.textContent = value || 'not present';
    });
    checkHeader(url, 'X-XSS-Protection', function(value) {
      xssProtectionResultElement.textContent = value || 'not present';
    });
    checkHeader(url, 'X-Content-Type-Options', function(value) {
      contentTypeOptionsResultElement.textContent = value || 'not present';
    });
    checkHeader(url, 'Strict-Transport-Security', function(value) {
      strictTransportSecurityResultElement.textContent = value || 'not present';
    });
    checkHeader(url, 'X-Permitted-Cross-Domain-Policy', function(value) {
      permittedCrossDomainPolicyResultElement.textContent = value || 'not present';
    });
    checkHeader(url, 'Access-Control-Allow-Origin', function(value) {
      accessControlAllowOriginResultElement.textContent = value || 'not present';
    });
    checkHeader(url, 'X-Forwarded-For', function(value) {
      xForwardedForResultElement.textContent = value || 'not present';
    });
    checkHeader(url, 'Server', function(value) {
      serverResultElement.textContent = value || 'not present';
    });
    checkHeader(url, 'Via', function(value) {
      viaResultElement.textContent = value || 'not present';
    });
    checkHeader(url, 'Set-Cookie', function(value) {
      setCookieResultElement.textContent = value || 'not present';
    });
  });
});
