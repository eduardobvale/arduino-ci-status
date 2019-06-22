module.exports = BitbucketPayload

function BitbucketPayload(json){
  var _json = json
    , payload
    , branchName

  constructor(json)

  return {
    getBranchName: getBranchName
  }

  function constructor(json){
    if( !json || !json.push ){
      throw new Error('BitbucketPayload -- invalid json', json)
    }
    branchName = json.push.changes[0].new.name
  }

  function getBranchName(){
    return branchName
  }
}