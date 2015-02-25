var expect = require('chai').expect

var CIStatus = require('../modules/CIStatus')

describe('CIStatus', function () {

  it('expectation', function () {
    var json = {
      payload: {
        status: 'success'
      }
    }
    var status = new CIStatus( json )
    expect( status.passed() ).to.be.ok
  })

})