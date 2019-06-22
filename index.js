var j5 = require('johnny-five')
  , board = new j5.Board()

var BitbucketPayload = require('./modules/BitbucketPayload')
var CIStatus = require('./modules/CIStatus')
var leds = { green: null, red:   null, yellow:   null }

var socket = require('socket.io-client')('https://shrouded-bayou-91024.herokuapp.com');


socket.on('connect', function(){
  console.log( '-- connected to server' )
});

socket.on('hook', function(data){

  try{
    var ciStatus = new CIStatus(data)
    if (ciStatus.getBranchName() == "master"){
      turnAll(false);
      ciStatus.passed() ? turnOnOff(leds.green, true) : turnOnOff(leds.red, true)
    }
  } catch(e){
    console.log( '-- failed to parse or invalid json - CI', e)
  }

  try{
    var bitbucketPayload = new BitbucketPayload(data)
    if (bitbucketPayload.getBranchName() == "master"){
      turnAll(false);
      turnOnOff(leds.yellow, true)
    }
  } catch(e){
    console.log( '-- failed to parse or invalid json - Bitbcuket')
  }

});

socket.on('disconnect', function(){
  console.log( '-- disconnected to server' )
});


board.on('ready', function() {
  console.log( '-- board ready' )
  leds.red = new j5.Led(13)
  leds.yellow = new j5.Led(12)
  leds.green = new j5.Led(11)

})


function turnAll(status){
  turnOnOff(leds.green, status)
  turnOnOff(leds.red, status)
  turnOnOff(leds.yellow, status)
}


function turnOnOff(led,turnOn){
  if( led ){
    turnOn ? led.on() : led.off()
    console.log( 'led turned ' + (turnOn ? 'on' : 'off') )
  }else{
    console.log( 'no led to turn ' + (turnOn ? 'on' : 'off') )
  }
}

