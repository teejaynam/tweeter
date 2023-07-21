$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    const maxCount = 140;
    const currentCount = $(this).val().length;
    const counter = $(this).closest('.new-tweet').find('.counter');
    let countRemainder = maxCount - currentCount;

    counter.text(countRemainder);

    if (countRemainder < 0) {
      counter.css('color', 'red');
    } else {
      counter.css('color', '');
    }
  });
});