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
  const referrerPolicyResultElement = document.querySelector('#referrerPolicyResult');
  const permissionsPolicyResultElement = document.querySelector('#permissionsPolicyResult');
  
  const xframeOptionsResultElement = document.querySelector('#xframeOptionsResult');
  const xssProtectionResultElement = document.querySelector('#xssProtectionResult');
  const contentTypeOptionsResultElement = document.querySelector('#contentTypeOptionsResult');
  const strictTransportSecurityResultElement = document.querySelector('#strictTransportSecurityResult');

  const serverResultElement = document.querySelector('#serverResult');



  checkButton.addEventListener('click', function() {
    const url = urlInput.value;

    checkHeader(url, 'X-Frame-Options', function(value) {
      if (value) {
        xframeOptionsResultElement.textContent = value;
        xframeOptionsResultElement.style.color = 'green';
      } else {
        xframeOptionsResultElement.textContent = 'Not Present - Vulnerable';
        xframeOptionsResultElement.style.color = 'red';
      }
    });

    checkHeader(url, 'Content-Security-Policy', function(value) {
      if (value) {
        cspResultElement.textContent = value;
        cspResultElement.style.color = 'green';
      } else {
        cspResultElement.textContent = 'Not Present - Vulnerable';
        cspResultElement.style.color = 'red';
      }
    });

    checkHeader(url, 'Referrer-Policy', function(value) {
      if (value && value.includes('unsafe-url')) {
        referrerPolicyResultElement.textContent = value;
        referrerPolicyResultElement.style.color = 'red';
      } else if (value) {
        referrerPolicyResultElement.textContent = value;
        referrerPolicyResultElement.style.color = 'green';
      } else {
        referrerPolicyResultElement.textContent = 'Not Present - Vulnerable';
        referrerPolicyResultElement.style.color = 'red';
      }
    });

    checkHeader(url, 'Permissions-Policy', function(value) {
      if (value) {
        permissionsPolicyResultElement.textContent = value;
        permissionsPolicyResultElement.style.color = 'green';
      } else {
        permissionsPolicyResultElement.textContent = 'Not Present - Vulnerable';
        permissionsPolicyResultElement.style.color = 'red';
      }
    });



    checkHeader(url, 'X-XSS-Protection', function(value) {
      if (value === '0') {
        xssProtectionResultElement.textContent = '0 - Vulnerable';
        xssProtectionResultElement.style.color = 'red';
      } else if (value) {
        xssProtectionResultElement.textContent = value;
        xssProtectionResultElement.style.color = 'green';
      } else {
        xssProtectionResultElement.textContent = 'Not Present - Vulnerable';
        xssProtectionResultElement.style.color = 'red';
      }
    });


    checkHeader(url, 'X-Content-Type-Options', function(value) {
      if (value) {
        contentTypeOptionsResultElement.textContent = value;
        contentTypeOptionsResultElement.style.color = 'green';
      } else {
        contentTypeOptionsResultElement.textContent = 'Not Present - vulnerable';
        contentTypeOptionsResultElement.style.color = 'red';
      }
    });


    
    checkHeader(url, 'Strict-Transport-Security', function(value) {
      if (value) {
        var maxAge = parseInt(value.match(/max-age\s*=\s*(\d+)/i)[1]);
        if (maxAge < 31536000) {
          strictTransportSecurityResultElement.textContent = value + ' - vulnerable';
          strictTransportSecurityResultElement.style.color = 'red';
        } else {
          strictTransportSecurityResultElement.textContent = value;
          strictTransportSecurityResultElement.style.color = 'green';
        }
      } else {
        strictTransportSecurityResultElement.textContent = 'Not Present - vulnerable';
        strictTransportSecurityResultElement.style.color = 'red';
      }
    });


    checkHeader(url, 'Server', function(value) {
      if (!value) {
        serverResultElement.textContent = 'Not Present - vulnerable';
        serverResultElement.style.color = 'red';
      } else if (/(\d+\.\d+)/.test(value)) {
        serverResultElement.textContent = value + ' - vulnerable';
        serverResultElement.style.color = 'red';
      } else {
        serverResultElement.textContent = value;
        serverResultElement.style.color = 'green';
      }
    });
    
  
    
  });
});
