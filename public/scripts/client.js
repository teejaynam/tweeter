//submit handler

const renderTweets = function(tweets) {
  $(".posted-tweets").empty();
  

  tweets.forEach((tweet) => {
    const oldTweet = createTweetElement(tweet);
    $('.posted-tweets').prepend(oldTweet);
  });
  
};

const createTweetElement = function(tweetData) {
  let $tweet = $(`<article class="tweet">`);

  $tweet.append(`
    <header>
      <img class="avatar" src=${tweetData.user.avatars}></img>
      <h3 class="name">${tweetData.user.name}</h3>
      <h4 class="handle">${tweetData.user.handle}</h4>
    </header>
    <body>
      <p>${tweetData.content.text}</p>
    </body>
    <footer>
      <div class="timestamp">${tweetData.created_at}</div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </footer>
  `);


  return $tweet;
};

/*get text from tweet-form and post to /tweets json, upon sucesful post, call cleanUp callback to empty textAtrea*/
const postTweet = () => {
  const data = $(".tweet-form").serialize();

  $.post("/tweets", data, cleanUp)
    .fail((error) => {
      console.error(error);
    });
};

/*load and render tweets upon sucessful GET*/
const loadTweets = () => {
  $.ajax({
    url: "/tweets",
    type: "GET",
    dataType: "json",
    success: (result) => {
      renderTweets(result);
    },
    error: (error) => {
      console.log('Error', error);
    },
  });
};

/* clears the textArea and reloads tweets */
const cleanUp = () => {
  $("#tweet-text").val("");
  loadTweets();
};

$(document).ready(function() {
  loadTweets();

  $(".tweet-form").on("submit", (event) => {
    event.preventDefault();
    postTweet();
  });

});