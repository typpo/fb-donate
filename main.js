$(function() {
  addButtons();
  setInterval(addButtons, 1000);
});

function addButtons() {
  $('.userContentWrapper').not('.stupid__donate-button-added').each(function() {
    var $button = $('<div>').addClass('stupid__donate-button');
    $(this).prepend($button).addClass('stupid__donate-button-added');
  });
}
