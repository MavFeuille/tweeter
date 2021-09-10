
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


//Escape function to prevent XSS for tweet element created as a string literal
const escape = function(str) {
  let tweetArticle = document.createElement("tweet-article");
  tweetArticle.appendChild(document.createTextNode(str));
  return tweetArticle.innerHTML;
};

//Helper function set timeout for error messages
const popError = function() {
  $(".error").delay(15000).slideUp("slow");
};

// Returning tweet <article> when doc is ready
$(document).ready(() => {
  //Hide error message by default
  $(".error").hide();

  //Setting toggle button on NAV bar
  $(".fas.fa-angle-double-down ").on("click", (event) => { 
    $(".incomingTweet").toggle("slow");
    $(".textarea").focus();
  });

  //Extract each data OBJECT from the data ARRAY
  const renderTweets = function(tweets) {
    $("#tweets-container").empty();
    for (const item of tweets) {
      // loops through tweets
      // calls createTweetElement for each tweet
      // takes return value and appends it to the tweets container
      const tweet = createTweetElement(item);
      console.log("Tweet from line 43: ", tweet);
      $("#tweets-container").prepend(tweet);
    }
  };
  
  // Pass the data OBJECT that extracted by renderTweets function to below so each tweet will be reflected on the browser
  const createTweetElement = function(tweetData) {
    const name = tweetData.user.name;
    const avatars = tweetData.user.avatars;
    const tweetHandle = tweetData.user.handle;
    const tweetContent = tweetData.content.text;
    const tweetCreated = timeago.format(tweetData.created_at);

    const tweetHtml = `       
             <article class="tweet-article">
               <header class="tweet-header">
                 <div class="display-pic-name">
                   <img width=50px height=50px src="${escape(avatars)}"> 
                   <h3 class="tweeter-name">${escape(name)}</h3>
                 </div>
                   <h3 class="hastag-name">${escape(tweetHandle)}</h3>
               </header>
               <div class="tweet-body">
                 <p>
                   ${escape(tweetContent)}
               </div>
               <footer class="tweet-footer">
                 <p>
                   ${escape(tweetCreated)}
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
  

  //Add event listener for submitting form & prevent default behavior
  const $incomingTweet = $(".incomingTweet");
  $incomingTweet.on('submit',function(event) {
    event.preventDefault();
    console.log("Incoming tweet is on its way, performing ajax call...");

    const formDataString = $(this).serialize();
    console.log("🚀 ~ file: client.js ~ line 97 ~ formDataString", formDataString);
    console.log("this: ", this);
    console.log("formDataString: ", formDataString);
    // const tweetLength = formDataString.length;
    // console.log("🚀 ~ file: client.js ~ line 77 ~ tweetLength", tweetLength)
    
    const tweetLength = $(".textarea").val().length;
    console.log("🚀 ~ file: client.js ~ line 80 ~ tweetLength", tweetLength);
    
    
    if (tweetLength === 0) {
      $("#0characters").slideDown("slow", popError);
    } else if (tweetLength > 140) {
      $("#tweet-too-long").slideDown("slow", popError);
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: formDataString,
        success: function(formDataString) {
          console.log("Success", formDataString);
          loadTweets();
        }
      });
    }
  });

  // Function for fetching tweets from "/tweets" page
  const loadTweets = function() {
    $.ajax({
      method: "GET",
      url: "/tweets",
      data: "json",
      success: function(data) {
        console.log("Success: ", data);
        renderTweets(data);
      }
    });
  };
  loadTweets();
});







