let postToTwitter = function(tweet){
  chrome.tabs.create({
    active: false,
    url: "https://twitter.com/intent/tweet?text=" + encodeURI(tweet)
  }, function(tab){
    setTimeout(function(){
      chrome.tabs.executeScript(tab.id, {
        code: "document.getElementById('update-form').submit();",
        runAt: "document_end"
      }, function(){
        setTimeout(function(){
          chrome.tabs.remove(tab.id);
        }, 5000);
      });
    }, 1000);
  });
};

let postToFacebook = function(tweet){
  chrome.tabs.create({
    // Need to activate the page to activate the button.
    active: true,
    url: "https://facebook.com"
  }, function(tab){
    setTimeout(function(){
      chrome.tabs.executeScript(tab.id, {
        file: "forFacebook.js",
        runAt: "document_end"
      }, function(){
        chrome.tabs.sendMessage(tab.id, {tabid:tab.id, tweet:tweet});
      });
    }, 1000);
  });
};

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    if(request.type === "tweet") {
      postToTwitter(request.tweet);
      postToFacebook(request.tweet);
    }
    if(request.type === "close_tab") {
      chrome.tabs.remove(request.tabid);
    }
  }
);
