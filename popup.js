let tweetButton = document.getElementById("tweet_button");
let tweetArea = document.getElementById("tweet_area");

tweetButton.onTweetChanged = function(){
  tweetButton.disabled = (tweetArea.value.length === 0);
}

tweetButton.onclick = function(){
  chrome.runtime.sendMessage({type:"tweet", tweet:tweetArea.value});
  tweetArea.clearTweet();
  window.close();
};

tweetArea.onkeyup = function(){
  chrome.storage.local.set({tweet:tweetArea.value});
  tweetButton.onTweetChanged();
}

tweetArea.clearTweet = function(){
  chrome.storage.local.remove("tweet");
  tweetArea.value = "";
  tweetButton.onTweetChanged();
}

chrome.storage.local.get({tweet:""}, function(result){
  tweetArea.value = result.tweet;
  tweetButton.onTweetChanged();
});
