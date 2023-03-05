function getDomainFromUrl(url) {
    var a = document.createElement('a');
    a.href = url;
    return a.hostname;
}
  
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var tabUrl = getDomainFromUrl(tabs[0].url);
    chrome.cookies.getAll({domain: tabUrl}, function(cookies) {
        if (cookies.length > 0) {
            var cookieInfo = "";
            var hasInsecureCookies = false;
            var hasThirdPartyCookies = false;
            for (var i = 0; i < cookies.length; i++) {
                cookieInfo += "Name: " + cookies[i].name + "<br>Value: " + cookies[i].value + "<br>Secure: " + cookies[i].secure + "<br>HttpOnly: " + cookies[i].httpOnly + "<br><br>";
                if (!cookies[i].secure || !cookies[i].httpOnly) {
                    hasInsecureCookies = true;
                }
                if (cookies[i].domain !== tabUrl) {
                    hasThirdPartyCookies = true;
                }
            }
                document.getElementById('cookie-info').innerHTML = cookieInfo;
            if (hasInsecureCookies) {
                document.getElementById('insecure-warning').textContent = tabUrl +' website has insecure cookies.';
            }else{
                document.getElementById('insecure-warning').textContent = tabUrl + ' website do not have insecure cookies.';
            }
    
            if (hasThirdPartyCookies) {
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
  