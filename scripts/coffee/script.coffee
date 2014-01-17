ROWS = 4
CONGRATS = [
  'Nice job, buddy!'
  'A winner is you!'
  'All good things must come to an end.'
  'You won, but it was still a waste of time.'
  'Congratulations! Your Certificate of Completion
   will be in the mail shortly.'
  "Now doesn't that feel better?"
  'Sic transit gloria'
  'Shall we play *another* game?'
  'Say, do you have some kind of short-term amnesia?'
]
SHAPES = ['circle', 'square', 'triangle', 'star']
COLORS = ['orange', 'purple']
deck = []
cardToMatchId = cardToMatchClass = null
clearThisRound = false
cardsToGo = SHAPES.length * COLORS.length * 2


$(document).ready ->
  buildDeck()
  deck = _.shuffle deck
  assignCardAttrs()
  progressReport()

  $('.card').click ->
  	# why would you click a card that's already flipped, huh?
    if $(this).hasClass 'up'
      return
    else unless cardToMatchId
      cardToMatchId = $(this).attr 'id'
      cardToMatchClass = $(this).attr 'class'
      $(this).toggleClass 'up'
    else if $(this).attr('class') == cardToMatchClass
      clearCardToMatch()
      $(this).toggleClass 'up'
      clearThisRound = false
      cardsToGo -= 2
    else
      $(this).toggleClass 'up'
      clearThisRound = true
    progressReport()

  # reset cards after mouse leaves second card that was flipped
  $('.card').mouseleave ->
    if clearThisRound
      $(this).toggleClass 'up'
      $('#' + cardToMatchId).toggleClass 'up'
      clearCardToMatch()
      clearThisRound = false

  null

class Card
  constructor : (@color, @shape) ->



progressReport = ->
  msg = if cardsToGo > 0 then (cardsToGo + " to go!") else randWinMsg()
  $('#ftw').html(msg)
  null

randWinMsg = ->
  randMsgNum = Math.floor Math.random() * CONGRATS.length
  CONGRATS[ randMsgNum ]

clearCardToMatch = -> cardToMatchId = cardToMatchClass = null

buildDeck = ->
  ((addPairOfCards c, s for s in SHAPES) for c in COLORS)
  deck

addPairOfCards = (c, s) ->
  deck.push( new Card c, s )
  deck.push( new Card c, s )
  null

assignCardAttrs = ->
  (assignCardAttrsGuts i for i in [0...deck.length])
  null

assignCardAttrsGuts = (i) ->
  # nth-child starts at 1, so add 1 to 'row' and 'col'
  card = deck[i]
  row = Math.floor(i / ROWS) + 1
  col = (i % ROWS) + 1
  $cardElmt = $( "#board div:nth-child(#{row}) div:nth-child(#{col})" )
  $cardElmt.addClass card.color
  $cardElmt.addClass card.shape
  $cardElmt.attr 'id', i
  null
