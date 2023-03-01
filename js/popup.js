// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function(event) {
    // Get all the section elements
    const section1 = document.getElementById("navbarLibraries");
    const section2 = document.getElementById("navbarHeaders");
    const section3 = document.getElementById("navbarCookies");

    document.getElementById('section1').style.display = 'none';
    document.getElementById('section2').style.display = 'none';
    document.getElementById('section3').style.display = 'none';
  
    // Add a click event listener to the section1 link
    section1.addEventListener("click", function(event) {
  
      // Prevent the default link behavior
      event.preventDefault();

      // Show section1 and hide other sections
      document.getElementById('section1').style.display = 'block';
      document.getElementById('section2').style.display = 'none';
      document.getElementById('section3').style.display = 'none';

      //Libraries -ADDED on 27 Feb 2022 
      //compare current jquery with latest
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "checkJQueryVersion"}, function(response) {
          if (response) {
            console.log("JQuery version on page: " + response.version);
            var resultDiv = document.getElementById("result");
            if (response.error) {
              resultDiv.innerHTML =  response.error ;
            } else {
              resultDiv.innerHTML = "JQuery version on page: " + response.version ;
            }
          }
        });
      });

    });

    // Add a click event listener to the section2 link
    section2.addEventListener("click", function(event) {
  
        // Prevent the default link behavior
        event.preventDefault();
  
        // Show section2 and hide other sections
        document.getElementById('section1').style.display = 'none';
        document.getElementById('section2').style.display = 'block';
        document.getElementById('section3').style.display = 'none';
    
    });
    
    // Add a click event listener to the section3 link
    section3.addEventListener("click", function(event) {
  
        // Prevent the default link behavior
        event.preventDefault();
  
        // Show section3 and hide other sections
        document.getElementById('section1').style.display = 'none';
        document.getElementById('section2').style.display = 'none';
        document.getElementById('section3').style.display = 'block';

        function getDomainFromUrl(url) {
          var a = document.createElement('a');
          a.href = url;
          return a.hostname;
        }
      
      
      //cookie 
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var domain = getDomainFromUrl(tabs[0].url);
      chrome.cookies.getAll({domain: domain}, function(cookies) {
          if (cookies.length > 0) {
              var cookieInfo = "";
              var hasInsecureCookies = false;
              var hasThirdPartyCookies = false;
              for (var i = 0; i < cookies.length; i++) {
                  cookieInfo += "Name: " + cookies[i].name + "<br>Value: " + cookies[i].value + "<br>Secure: " + cookies[i].secure + "<br>HttpOnly: " + cookies[i].httpOnly + "<br><br>";
                  if (!cookies[i].secure || !cookies[i].httpOnly) {
                  hasInsecureCookies = true;
                  }
                  if (cookies[i].domain !== domain) {
                  hasThirdPartyCookies = true;
                  }
          }
          document.getElementById('cookie-info').innerHTML = cookieInfo;
              if (hasInsecureCookies) 
              {
                  console.log("Insecure cookies");
                  document.getElementById('insecure-warning').textContent = domain +' website has insecure cookies.';
              }else
              {
                  console.log("Do not have Insecure cookies");
                  document.getElementById('insecure-warning').textContent = domain + ' website do not have insecure cookies.';
              }
      
              if (hasThirdPartyCookies) 
              {
                  console.log("Third Party cookies");
                  document.getElementById('third-party-warning').textContent = domain +' website uses third-party cookies.';
              }
              else
              {
                  console.log("Do not use Third Party cookies");
                  document.getElementById('third-party-warning').textContent = domain +' website do not use third-party cookies.';
              }
          } 
          else 
          {
              console.log("No cookie found");
              document.getElementById('cookie-info').textContent = 'No cookies found at all.';
          }
      });
      });

       
 
       });
  
    });
  






  