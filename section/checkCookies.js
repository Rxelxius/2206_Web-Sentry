function getDomainFromUrl(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.hostname;
}
  
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tabUrl = getDomainFromUrl(tabs[0].url);
    chrome.cookies.getAll({domain: tabUrl}, function(cookies) {
        if (cookies.length > 0) {
            var hasInsecureCookies = false;
            var hasThirdPartyCookies = false;
            var cookieInfo = "<table class='bordered'>";
            for (var i = 0; i < cookies.length; i++) {
                cookieInfo += "<tr><th>Name:</th><th>" + cookies[i].name + "</th></tr>";
                cookieInfo += "<tr><td>Value:</td><td>" + cookies[i].value + "</td></tr>";
                cookieInfo += "<tr><td>Secure:</td><td>" + cookies[i].secure + "</td></tr>";
                cookieInfo += "<tr><td>HttpOnly:</td><td>" + cookies[i].httpOnly + "</td></tr>";
                if (!cookies[i].secure || !cookies[i].httpOnly) {
                    hasInsecureCookies = true;
                }
                if (cookies[i].domain !== tabUrl) {
                    hasThirdPartyCookies = true;
                }
            }
            cookieInfo += "</table>";

                document.getElementById('cookie-info').innerHTML = cookieInfo;
            if (hasInsecureCookies) {
                document.querySelector('#insecure-warning').style.color = 'red';
                document.getElementById('insecure-warning').textContent = tabUrl +' website has insecure cookies.';
            }else{
                document.querySelector('#insecure-warning').style.color = 'green';
                document.getElementById('insecure-warning').textContent = tabUrl + ' website do not have insecure cookies.';
            }
    
            if (hasThirdPartyCookies) {
                document.querySelector('#third-party-warning').style.color = 'blue';
                document.getElementById('third-party-warning').textContent = tabUrl +' website uses third-party cookies.';
            }
            else{
                document.getElementById('third-party-warning').textContent = tabUrl +' website do not use third-party cookies.';
            }
        } else {
            document.getElementById('cookie-info').textContent = 'No cookies found.';
        }
    });
});
  