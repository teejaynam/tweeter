//submit handler

//function to scape text and create a p tag
const escape = function(str) {
  let p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}

const renderTweets = function(tweets) {
  $(".posted-tweets").empty();
  

  tweets.forEach((tweet) => {
    const oldTweet = createTweetElement(tweet);
    $('.posted-tweets').prepend(oldTweet);
  });

  timeago.render(document.querySelectorAll('.timeago'));
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
      <p>${escape(tweetData.content.text)}</p>
    </body>
    <footer>
      <span class="timeago" datetime="${tweetData.created_at}">${tweetData.created_at}</span>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
    </footer>
  `);


  return $tweet;
};

/*get text from tweet-form and post to /tweets json, upon sucesful post, call cleanUp callback to empty textAtrea*/
const postTweet = () => {
  const tweetText = $("#tweet-text").val().trim();

  if (tweetText === "") {
    alert("Empty text, please enter text before tweeting");
    return;
  }

  if (tweetText.length > 140) {
    alert("Tweet exceeds maximum character limit of 140");
    return;
  }

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
  $(".counter").val(140);
  loadTweets();
};

/* load DOM */
$(document).ready(function() {
  loadTweets();

  $(".tweet-form").on("submit", (event) => {
    event.preventDefault();
    postTweet();
  });

  //timeago().render(document.querySelectorAll('.timeago'));
});