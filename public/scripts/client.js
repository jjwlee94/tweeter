$(document).ready(function () {
  // const data = [
  // {
  //   user: {
  //     name: "Newton",
  //     avatars: "https://i.imgur.com/73hZDYK.png",
  //     handle: "@SirIsaac",
  //   },
  //   content: {
  //     text: "If I have seen further it is by standing on the shoulders of giants",
  //   },
  //   created_at: 1461116232227,
  // },
  // {
  //   user: {
  //     name: "Descartes",
  //     avatars: "https://i.imgur.com/nlhLi3I.png",
  //     handle: "@rd",
  //   },
  //   content: {
  //     text: "Je pense , donc je suis",
  //   },
  //   created_at: 1461113959088,
  // },
  // ];

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
      <div class="tweet-text">${tweet.content.text}</div>
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
    for (let tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $("#tweets-container").append($tweet);
    }
  };

  renderTweets(data);

  $("#new-tweet-form").submit(function (event) {
    event.preventDefault();
    const tweet = $(this).serialize();
    $.post("/tweets", tweet);
  });

  const loadTweets = function () {
    $.get("/tweets", function (tweet) {
      renderTweets(tweet);
    });
  };

  loadTweets();
});
