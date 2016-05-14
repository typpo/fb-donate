(function() {
  var DONATION_MAP = {
    'trump': {
      'matchAgainst': ['hillary', 'clinton', 'bernie', 'sanders'],
    },
    'hillary': {
      'matchAgainst': ['trump', 'paul ryan'],
    },
  };

  var BUTTON_TEXTS = ['Fuck you', 'Shut up', 'Go away'];

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

      var donateToCandidate = isPoliticalPost($this.text());
      if (donateToCandidate) {
        var $button = $('<div>').addClass('stupid__donate-button')
            .text(getRandomButtonText())
            .data('candidate', donateToCandidate);
        $this.prepend($button).addClass('stupid__donate-button-added');
      }
    });
  }

  function isPoliticalPost(postText) {
    postText = postText.toLowerCase();

    for (var candidateKey in DONATION_MAP) {
      var matchAgainst = DONATION_MAP[candidateKey]['matchAgainst'];
      var hasCandidateMatch = false;
      matchAgainst.forEach(function(keyword) {
        if (postText.indexOf(keyword) > -1) {
          hasCandidateMatch = true;
        }
      });
      if (hasCandidateMatch) {
        return candidateKey;
      }
    }
    return null;
  }

  function getRandomButtonText() {
    return BUTTON_TEXTS[Math.floor(Math.random() * BUTTON_TEXTS.length - 1)];
  }
})();
