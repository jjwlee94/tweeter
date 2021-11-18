$(document).ready(function () {
  const data = [];

  // Hide error messages as default
  $("#empty-tweet").hide();
  $("#long-tweet").hide();

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = function (tweet) {
    const $tweet = $(`<article class="tweet">
      <div class="tweet-header">
        <div class="user-profile">
          <img class="user-avatar" src=${tweet.user.avatars} />
          <h4 class="user-name">${tweet.user.name}</h4>
        </div>
        <div>
          <h4 class="user-handle">${tweet.user.handle}</h4>
        </div>
      </div>
      <div class="tweet-text">${escape(tweet.content.text)}</div>
      <footer class="tweet-footer">
        <span class="timeago">${timeago.format(tweet.created_at)}</span>
        <div class="tweet-response">
          <i class="fas fa-flag"></i>
          <i class="fas fa-retweet"></i>
          <i class="fas fa-heart"></i>
        </div>
      </footer>
    </article>`);
    return $tweet;
  };

  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").prepend($tweet);
    }
  };

  $("#new-tweet-form").submit(function (event) {
    event.preventDefault();

    const input = $(this).find("textarea").val();

    if (!input) {
      // Show empty tweet error
      $("#empty-tweet").slideDown();
      $("#long-tweet").hide();
    } else if (input.length > 140) {
      // Show long tweet error
      $("#long-tweet").slideDown();
      $("#empty-tweet").hide();
    } else {
      const tweets = $(this).serialize();
      $.post("/tweets", tweets, () => {
        // Reset error messages
        $("#empty-tweet").slideUp();
        $("#long-tweet").slideUp();
        // Reset textarea
        $(this).find("#tweet-text").val("");
        // Reset counter to 140 char
        $(this).find(".counter").val(140);
        loadTweets();
      });
    }
  });

  const loadTweets = function () {
    $.get("/tweets", function (tweets) {}).then((result) => {
      renderTweets(result);
    });
  };

  loadTweets();
});
