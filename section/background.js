//jquery
chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {file: "contentscript.js"}, function() {
    chrome.tabs.sendMessage(tab.id, {action: "checkJQueryVersion"});
  });
});







