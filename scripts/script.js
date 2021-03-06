// Generated by CoffeeScript 1.6.3
var COLORS, CONGRATS, Card, ROWS, SHAPES, addPairOfCards, assignCardAttrs, assignCardAttrsGuts, buildDeck, cardToMatchClass, cardToMatchId, cardsToGo, clearCardToMatch, clearThisRound, deck, progressReport, randWinMsg, startNewGame;

ROWS = 4;

CONGRATS = [
  'Nice job, buddy!', 'A winner is you!', 'All good things must come to an end.', 'You won, but it was still a waste of time.', 'Congratulations! Your Certificate of Completion\
   will be in the mail shortly.', "Now doesn't that feel better?", 'Sic transit gloria', 'Shall we play *another* game?', 'Say, do you have some kind of short-term amnesia?'
];

SHAPES = ['circle', 'square', 'triangle', 'star'];

COLORS = ['orange', 'purple'];

cardToMatchId = cardToMatchClass = clearThisRound = cardsToGo = null;

deck = [];

$(document).ready(function() {
  buildDeck();
  startNewGame();
  $('.card').click(function() {
    if ($(this).hasClass('up')) {
      return;
    } else if (!cardToMatchId) {
      cardToMatchId = $(this).attr('id');
      cardToMatchClass = $(this).attr('class');
      $(this).toggleClass('up');
    } else if ($(this).attr('class') === cardToMatchClass) {
      clearCardToMatch();
      $(this).toggleClass('up');
      clearThisRound = false;
      cardsToGo -= 2;
    } else {
      $(this).toggleClass('up');
      clearThisRound = true;
    }
    return progressReport();
  });
  $('.card').mouseleave(function() {
    if (clearThisRound) {
      $(this).toggleClass('up');
      $('#' + cardToMatchId).toggleClass('up');
      clearCardToMatch();
      return clearThisRound = false;
    }
  });
  $('#reset').click(function() {
    return startNewGame();
  });
  return null;
});

Card = (function() {
  function Card(color, shape) {
    this.color = color;
    this.shape = shape;
  }

  return Card;

})();

startNewGame = function() {
  deck = _.shuffle(deck);
  assignCardAttrs();
  cardToMatchId = cardToMatchClass = null;
  clearThisRound = false;
  cardsToGo = SHAPES.length * COLORS.length * 2;
  return progressReport();
};

progressReport = function() {
  var msg;
  msg = cardsToGo > 0 ? cardsToGo + " to go!" : randWinMsg();
  $('#ftw').html(msg);
  return null;
};

randWinMsg = function() {
  var randMsgNum;
  randMsgNum = Math.floor(Math.random() * CONGRATS.length);
  return CONGRATS[randMsgNum];
};

clearCardToMatch = function() {
  return cardToMatchId = cardToMatchClass = null;
};

buildDeck = function() {
  var c, s, _i, _j, _len, _len1;
  for (_i = 0, _len = COLORS.length; _i < _len; _i++) {
    c = COLORS[_i];
    for (_j = 0, _len1 = SHAPES.length; _j < _len1; _j++) {
      s = SHAPES[_j];
      addPairOfCards(c, s);
    }
  }
  return deck;
};

addPairOfCards = function(c, s) {
  deck.push(new Card(c, s));
  deck.push(new Card(c, s));
  return null;
};

assignCardAttrs = function() {
  var i, _i, _ref;
  for (i = _i = 0, _ref = deck.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
    assignCardAttrsGuts(i);
  }
  return null;
};

assignCardAttrsGuts = function(i) {
  var $cardElmt, card, col, row;
  card = deck[i];
  row = Math.floor(i / ROWS) + 1;
  col = (i % ROWS) + 1;
  $cardElmt = $("#board div:nth-child(" + row + ") div:nth-child(" + col + ")");
  $cardElmt.removeAttr('class');
  $cardElmt.addClass("card " + card.color + " " + card.shape);
  $cardElmt.attr('id', i);
  return null;
};
