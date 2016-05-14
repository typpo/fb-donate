$(function() {
  addButtons();
  setInterval(addButtons, 1000);
});

function addButtons() {
  $('.userContentWrapper').not('.stupid__donate-button-added').each(function() {
    var $this = $(this);

    if ($this.find('.userContentWrapper').length > 0) {
      // This is just a wrapper wrapper -- ignore.
      return true;
    }

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
