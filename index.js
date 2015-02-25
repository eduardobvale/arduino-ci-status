var five = require('johnny-five')
  , board = new five.Board()

var led = {}

board.on('ready', function() {
  led.green = new five.Led(3)
  led.red = new five.Led(6)

  led.green.fadeIn()
  led.red.fadeIn()
})