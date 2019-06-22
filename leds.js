var j5 = require('johnny-five')
  , board = new j5.Board()

var leds = { green: null, red:   null, blue:   null }

board.on('ready', function() {
  console.log( '-- board ready' )
  leds.red = new j5.Led(13)
  leds.yellow = new j5.Led(12)
  leds.green = new j5.Led(11)
  
  turnOnOff(leds.green, true)
  turnOnOff(leds.red, true)
  turnOnOff(leds.yellow, true)
})

function turnOnOff(led,turnOn){
  if( led ){
    turnOn ? led.on() : led.off()
    console.log( 'led turned ' + (turnOn ? 'on' : 'off') )
  }else{
    console.log( 'no led to turn ' + (turnOn ? 'on' : 'off') )
  }
}