//jquery
chrome.action.onClicked.addListener(function(tab) {
  chrome.tabs.executeScript(tab.id, {file: "checkLibraries.js"}, function() {
    chrome.tabs.sendMessage(tab.id, {action: "checkJQueryVersion"});
  });
});