var CIStatus = require('./modules/CIStatus')
var BitbucketPayload = require('./modules/BitbucketPayload')

var socket = require('socket.io-client')('https://shrouded-bayou-91024.herokuapp.com');


socket.on('connect', function(){
  console.log( '-- connected to server' )
});

socket.on('hook', function(data){

  try{
    var ciStatus = new CIStatus(data)
    ciStatus.passed()
    console.log( '-- CIStatus', ciStatus.passed() )
  } catch(e){
    console.log( '-- failed to parse or invalid json - CI')
  }

  try{
    var bitbucketPayload = new BitbucketPayload(data)
    console.log(bitbucketPayload.getBranchName())
    if (bitbucketPayload.getBranchName() == "master"){
    }
  } catch(e){
    console.log( '-- failed to parse or invalid json - Bitbcuket')
  }

});

socket.on('disconnect', function(){
  console.log( '-- disconnected to server' )
});

