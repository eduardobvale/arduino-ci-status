module.exports = CIStatus

function CIStatus(json){
  var _json = json
    , payload
    , status
    , branchName

  constructor(json)

  return {
    passed: passed,
    failed: failed,
    getBranchName: getBranchName
  }


  function constructor(json){
    if( !json || !json.payload ){
      throw new Error('CIStatus -- invalid json: ')
    }
    payload = json.payload
    status = payload.status
    branchName = payload.branch

  }

  function passed(){
    return /success/.test(status)
  }
  
  function failed(){
    return !/success/.test(status)
  }

  function getBranchName(){
    return branchName
  }
}