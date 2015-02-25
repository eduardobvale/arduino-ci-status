module.exports = CIStatus

function CIStatus(json){
  var _json = json
    , payload
    , status

  constructor(json)

  return {
    passed: passed,
    failed: failed,
  }


  function constructor(json){
    if( !json || !json.payload )
      throw new Error('invalid json: ' + json)
    payload = json.payload
    status = payload.status
  }

  function passed(){
    return /success/.test(status)
  }
  function failed(){
    return !/success/.test(status)
  }
}