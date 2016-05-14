$(function() {
  addButtons();
  setInterval(addButtons, 1000);
});

function addButtons() {
  $('.userContentWrapper').not('.stupid__donate-button-added').each(function() {
    var $this = $(this);

    var trigger = isPoliticalPost($this.text());
    if (trigger) {
      var $button = $('<div>').addClass('stupid__donate-button').text('Button');
      $this.prepend($button).addClass('stupid__donate-button-added');
    }
  });
}

function isPoliticalPost(postText) {
  return true;
}
