
//current and latest version of jquery [ working ]
/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "checkJQueryVersion") {
    // Inject a script tag into the page to get the jQuery version
    var script = document.createElement("script");
    script.textContent = "var version = typeof jQuery !== 'undefined' ? jQuery.fn.jquery : 'jQuery is not loaded'; window.postMessage({ type: 'jquery-version', version: version }, '*');";
    document.documentElement.appendChild(script);
    script.parentNode.removeChild(script);

    // Listen for the response from the injected script
    window.addEventListener("message", function(event) {
      if (event.source == window && event.data.type == "jquery-version") {
        console.log("jquery is loaded");
        console.log("version:" + event.data.version);

        // Load the local jQuery file
        fetch(chrome.runtime.getURL("jquery.min.js"))
          .then(response => response.text())
          .then(text => {
            // Parse the version string from the local jQuery file
            var localVersion = text.match(/jQuery v(\d+\.\d+\.\d+)/)[1];
            console.log("local version:" + localVersion);

            // Compare the version of jQuery loaded on the page with the local version
            if (event.data.version < localVersion) {
                console.log("The jQuery version loaded on the page (" + event.data.version + ") is lower than the local version (" + localVersion + ").");
                sendResponse({error: "The jQuery version loaded on the page (" + event.data.version + ") is lower than the local version (" + localVersion + ")."});
            } else {
              sendResponse({version: event.data.version});
            }
          })
          .catch(error => {
            console.log("Error loading local jQuery file: " + error);
            sendResponse({error: "Error loading local jQuery file: " + error});
          });
      }
    });
    return true;  // Return true to indicate that the response will be asynchronous
  }
});



*/
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action == "checkJQueryVersion") {
    // Inject a script tag into the page to get the jQuery version
    var script = document.createElement("script");
    script.src = chrome.runtime.getURL("section/jquery-version.js");
    document.documentElement.appendChild(script);
    script.parentNode.removeChild(script);

    // Listen for the response from the injected script
    window.addEventListener("message", function(event) {
      if (event.source == window && event.data.type == "jquery-version") {
        console.log("jquery is loaded");
        console.log("version:" + event.data.version);

        // Load the local jQuery file
        fetch(chrome.runtime.getURL("js/jquery.min.js"))
          .then(response => response.text())
          .then(text => {
            // Parse the version string from the local jQuery file
            var localVersion = text.match(/jQuery v(\d+\.\d+\.\d+)/)[1];
            console.log("local version:" + localVersion);

            // Compare the version of jQuery loaded on the page with the local version
            if (event.data.version < localVersion) {
                console.log("The jQuery version loaded on the page (" + event.data.version + ") is lower than the local version (" + localVersion + ").");
                sendResponse({error: "The jQuery version loaded on the page (" + event.data.version + ") is lower than the local version (" + localVersion + ")."});
            } else {
              sendResponse({version: event.data.version});
            }
          })
          .catch(error => {
            console.log("Error loading local jQuery file: " + error);
            sendResponse({error: "Error loading local jQuery file: " + error});
          });
      }
    });
    return true;  // Return true to indicate that the response will be asynchronous
  }
});


