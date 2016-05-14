(function() {
  'use strict';

  var DONATION_MAP = {
    'trump': {
      'matchAgainst': ['hillary', 'clinton', 'bernie', 'sanders'],
    },
    'hillary': {
      'matchAgainst': ['trump', 'paul ryan'],
    },
  };

  var BUTTON_TEXTS = ['Fuck you', 'Stop it', 'Please stop'];

  $(function() {
    var stripeHandler = setupStripe();
    addButtons(stripeHandler);
    setInterval(addButtons.bind(this, stripeHandler), 1000);
  });

  function addButtons(stripeHandler) {
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
            .data('candidate', donateToCandidate)
            .on('click', function() {
              stripeHandler.open({
                name: 'Donate to ' + capitalize(donateToCandidate),
                description: '',
                amount: 100,
              });
              return false;
            });
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
    return BUTTON_TEXTS[Math.floor(Math.random() * BUTTON_TEXTS.length)];
  }

  function setupStripe() {
    return StripeCheckout.configure({
      key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
      image: 'https://i.imgur.com/b0aT98ym.jpg',
      locale: 'auto',
      token: function(token) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
      }
    });
  }

  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }
})();
