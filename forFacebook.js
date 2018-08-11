chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    let box = document.getElementsByName("xhpc_message")[0];
    box.value = request.tweet;
    box.focus();

    setTimeout(function(){
      let button = document.querySelector("button[data-testid='react-composer-post-button']");
      button.click();
      setTimeout(function(){
        chrome.runtime.sendMessage({type:"close_tab", tabid:request.tabid});
      }, 3000);
    }, 5000);
  }
);
