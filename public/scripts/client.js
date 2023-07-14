// Fake data taken from initial-tweets.json
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


const renderTweets = function(tweets) {
  tweets.forEach((tweet) => {
    const oldTweet = createTweetElement(tweet);
    console.log(oldTweet);
    $('.posted-tweets').append(oldTweet);
  })
}

const createTweetElement = function(tweetData){
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
}

$(document).ready(function() {
  renderTweets(data);
});