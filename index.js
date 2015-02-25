var five = require('johnny-five')
  , board = new five.Board()

var net = require('net')


var leds = {
  green: null,
  red:   null,
}


var WEBHOOK_PUBLISHER_HOST = process.env.WEBHOOK_PUBLISHER_HOST || '146.185.167.197'
var WEBHOOK_PUBLISHER_TCP_PORT = process.env.WEBHOOK_PUBLISHER_TCP_PORT || 3001

var client = new net.Socket()
client.connect(WEBHOOK_PUBLISHER_TCP_PORT, WEBHOOK_PUBLISHER_HOST, function() {
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
    jsonData = JSON.parse(data)
  } catch(e){}

  if( !jsonData ){
    console.log( '-- failed to parse json', data )
    return
  }

  turnOnOff(leds.green,false)
  turnOnOff(leds.red,false)

  if( jsonData.payload ){
    if( /success/.test(jsonData.payload.status) ){
      turnOnOff(leds.green,true)
    }else{
      turnOnOff(leds.red,true)
    }
  } else {
    console.log( '-- json has no property payload' )
  }
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