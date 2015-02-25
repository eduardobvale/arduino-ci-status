var five = require('johnny-five')
  , board = new five.Board()
  , net = require('net')

var led = {}
var buffer = ''



var client = connectToServer()

function connectToServer(){
  return net.connect({
    host:'146.185.167.197',
    port: 3001
  }, function() {
    console.log('connected to server!')
  })
}

client
.on('data', function(binary) {
  var data = binary.toString()
  buffer += data
  console.log( 'stream -- got data' )
})
.on('end', function(){
  console.log( 'stream -- end data' )
  var jsonData
  try{
    jsonData = JSON.parse(buffer)
  } catch(e){}

  data = ''
  if( !jsonData ){
    console.log( '-- failed to parse json', buffer )
    data = ''
    return
  }

  led.green.off()
  led.red.off()

  if( jsonData.payload ){
    if( /success/.test(jsonData.payload.status) )
      led.green.on()
    else
      led.red.on()
  } else {
    console.log( '-- json has no property payload' )
  }

  client = connectToServer()
})


board.on('ready', function() {
  led.green = new five.Led(3)
  led.red = new five.Led(6)
})