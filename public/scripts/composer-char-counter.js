$(document).ready(function() {
  console.log("Ready to count!");
  $(".textarea").on("input", function(event) {
    const tweetLength = event.target.value.length;
    const textLimit = 140;
    console.log("tweetLength: ", tweetLength);

    $(".counter").text(textLimit - tweetLength);
    if (tweetLength > textLimit) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});