/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Returning tweet <article>

$(document).ready (() => {
  
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]
  
  //Extract each data OBJECT from the data ARRAY
  const renderTweets = function (tweets) {
    for (const item of tweets) {
      // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
        const tweet = createTweetElement(item);
        console.log("Tweet from line 43: ", tweet);
        $("#tweets-container").prepend(tweet)

    }

  };
  
  // Pass the data OBJECT that extracted by renderTweets function to below so each tweet will be reflected on the browser
  const createTweetElement = function(tweetData) {
    const name = tweetData.user.name;
    const avatars = tweetData.user.avatars;
    const tweetHandle = tweetData.user.handle;
    const tweetContent = tweetData.content.text;
    const tweetCreated = timeago.format(tweetData.created_at);
  
    let tweetHtml = `       
             <article class="tweet-article">
               <header class="tweet-header">
                 <div class="display-pic-name">
                   <img width=50px height=50px src="${avatars}"> 
                   <h3 class="tweeter-name">${name}</h3>
                 </div>
                   <h3 class="hastag-name">${tweetHandle}</h3>
               </header>
               <div class="tweet-body">
                 <p>
                   ${tweetContent}
               </div>
               <footer class="tweet-footer">
                 <p>
                   ${tweetCreated}
                 </p>
                 <span class="footer-icons">
                   <i class="fas fa-flag"></i>
                   <i class="fas fa-retweet"></i>
                   <i class="fas fa-heart"></i>
                 </span>
               </footer>
             </article>
      `;
    return tweetHtml;
  };
  
 
  renderTweets(data);
});





