var j5 = require('johnny-five')
  , board = new j5.Board()

var WEBHOOK_PUBLISHER_HOST = process.env.WEBHOOK_PUBLISHER_HOST || '146.185.167.197'
var WEBHOOK_PUBLISHER_TCP_PORT = process.env.WEBHOOK_PUBLISHER_TCP_PORT || 3001

var CIStatus = require('./modules/CIStatus')
var leds = { green: null, red:   null }

var net = require('net')
var JSONSocket = require('json-socket')
var socket = new JSONSocket(new net.Socket())
socket.connect(WEBHOOK_PUBLISHER_TCP_PORT, WEBHOOK_PUBLISHER_HOST)

socket.on('connect', function(){
  console.log( '-- connected to server' )
  socket.on('close', function(hadError) {
    if (hadError) console.log( '-- connection closed with error' )
    else console.log( '-- connection closed' )
  })
  socket.on('error', function(error) { console.log( '-- error', error ) })
  socket.on('message', function(data) {
    var ciStatus
    try{
      ciStatus = new CIStatus(data)
    } catch(e){
      console.log( '-- failed to parse or invalid json', data )
      return
    }
    turnOnOff(leds.green, false)
    turnOnOff(leds.red, false)
    ciStatus.passed() ? turnOnOff(leds.green, true) : turnOnOff(leds.red, true)
  })
})

board.on('ready', function() {
  console.log( '-- board ready' )
  leds.green = new j5.Led(6)
  leds.red = new j5.Led(3)
})

function turnOnOff(led,turnOn){
  if( led ){
    turnOn ? led.on() : led.off()
    console.log( 'led turned ' + (turnOn ? 'on' : 'off') )
  }else{
    console.log( 'no led to turn ' + (turnOn ? 'on' : 'off') )
  }
}