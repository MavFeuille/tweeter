$(document).ready(function() {
  console.log("Ready to count!");
  $(".textarea").on("input", function(event) {
    const tweetLength = event.target.value.length;
    console.log("tweetLength: ", tweetLength);

    $(".counter").text(140 - tweetLength);
    if (tweetLength > 140) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});