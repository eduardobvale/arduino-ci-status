var five = require('johnny-five')
  , board = new five.Board()

board.on('ready', function() {
  (new five.Led(4)).strobe()
})