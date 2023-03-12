// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function(event) {

  // Get all the section elements
  const section1 = document.getElementById("navbarLibraries");
  const section2 = document.getElementById("navbarHeaders");
  const section3 = document.getElementById("navbarCookies");

  document.getElementById('section1').style.display = 'none';
  document.getElementById('section2').style.display = 'none';
  document.getElementById('section3').style.display = 'none';
  
  // Add a click event listener to the Libraries section link
  section1.addEventListener("click", function(event) {
  
    // Prevent the default link behavior
    event.preventDefault();

    // Show section1 and hide other sections
    document.getElementById('section1').style.display = 'block';
    document.getElementById('section2').style.display = 'none';
    document.getElementById('section3').style.display = 'none';
    
    //lit-element
    // get the current tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // execute content script to find LitElement components
      chrome.tabs.executeScript(
        tabs[0].id,
        {code: `
          const litElements = Array.from(document.querySelectorAll('*'))
            .filter(el => el.tagName.startsWith('LIT-'))
            .map(el => el.tagName);
          litElements;
        `},
        function(result) {
          // update the list in the popup.html file
          const componentsList = document.getElementById('components');
          result[0].forEach(component => {
            const listItem = document.createElement('li');
            listItem.innerText = component;
            componentsList.appendChild(listItem);
          });
        }
      );
    });

    // //Libraries -ADDED on 27 Feb 2022 - compare current jquery with latest
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   chrome.tabs.sendMessage(tabs[0].id, {action: "checkJQueryVersion"}, function(response) {
    //     if (response) {
          
    //       var resultDiv = document.getElementById("result");
    //       if (response.error) {
    //         resultDiv.innerHTML =  response.error ;
    //       } else {
    //         resultDiv.innerHTML = "JQuery version on page: " + response.version ;
    //       }
    //     }
    //   });
    // });
    
  });

  // Add a click event listener to the WebHeaders section link
  section2.addEventListener("click", function(event) {
  
    // Prevent the default link behavior
    event.preventDefault();
  
    // Show section2 and hide other sections
    document.getElementById('section1').style.display = 'none';
    document.getElementById('section2').style.display = 'block';
    document.getElementById('section3').style.display = 'none';
    
  });
    
  // Add a click event listener to the Cookies section link
  section3.addEventListener("click", function(event) {
  
    // Prevent the default link behavior
    event.preventDefault();
  
    // Show section3 and hide other sections
    document.getElementById('section1').style.display = 'none';
    document.getElementById('section2').style.display = 'none';
    document.getElementById('section3').style.display = 'block';


  });

  // Overall URL query for Chrome Extension
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var currentUrl = tabs[0].url;
    document.getElementById('currentUrl').textContent = currentUrl;
  });
  
});
  