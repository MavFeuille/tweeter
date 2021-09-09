
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



// Returning tweet <article>

$(document).ready (() => {
    
  //Extract each data OBJECT from the data ARRAY
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
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
  

  //Add event listener for submit & prevent default behavior
  
  const $incomingTweet = $(".incomingTweet");
  $incomingTweet.on('submit',function (event) {
    event.preventDefault();
    console.log("Submit-button clicked, performing ajax call...")

    const formDataString = $(this).serialize();
    // console.log("🚀 ~ file: client.js ~ line 97 ~ formDataString", formDataString)
    console.log("this: ", this);
    console.log("formDataString: ", formDataString);
    const tweetMessage = event.target.value;


    // $.post("/tweets", formDataString, function (formDataString) {
    //   console.log("Success", tweetMessage);

    // })
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: formDataString,
      success: function (formDataString) {
        console.log("Success", tweetMessage);
        loadTweets();
      }

    });

  });

  const loadTweets = function () {
    // Function for fetching tweets from "/tweets" page
  
    $.ajax({
      method: "GET",
      url: "/tweets",
      data: "json",
      success: function (data) {
        console.log("Success: ", data);
        renderTweets(data);
      }
    });
  }
  loadTweets();
  // const $textarea = $(".textarea");
  // $textarea.on('submit')

  
  

});







