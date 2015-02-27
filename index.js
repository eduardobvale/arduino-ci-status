var five = require('johnny-five')
  , board = new five.Board()

var net = require('net')
var socket = new net.Socket()
var CIStatus = require('./modules/CIStatus')
var ciStatus


var leds = {
  green: null,
  red:   null,
}


var WEBHOOK_PUBLISHER_HOST = process.env.WEBHOOK_PUBLISHER_HOST || '146.185.167.197'
var WEBHOOK_PUBLISHER_TCP_PORT = process.env.WEBHOOK_PUBLISHER_TCP_PORT || 3001

socket.connect(WEBHOOK_PUBLISHER_TCP_PORT, WEBHOOK_PUBLISHER_HOST, function() {
  console.log('-- connected to server!')
})
.on('close', function(hadError) {
  if (hadError)
    console.log( '-- connection closed with error' )
  else
    console.log( '-- connection closed' )
})
.on('error', function(error) {
  console.log( '-- error', error )
})
.on('data', function(binary) {
  var data = binary.toString()
  console.log( '-- data', data )
  try{
    ciStatus = new CIStatus(JSON.parse(data))
  } catch(e){
    console.log( '-- failed to parse or invalid json', data )
    return
  }
  turnOnOff(leds.green, false)
  turnOnOff(leds.red, false)
  ciStatus.passed() ? turnOnOff(leds.green, true) : turnOnOff(leds.red, true)
})


board.on('ready', function() {
  leds.green = new five.Led(3)
  leds.red = new five.Led(6)
})



function turnOnOff(led,turnOn){
  if( led ){
    turnOn ? led.on() : led.off()
    console.log( 'led turned ' + (turnOn ? 'on' : 'off') )
  }else{
    console.log( 'no led to turn ' + (turnOn ? 'on' : 'off') )
  }
}