var expect = require('chai').expect

var CIStatus = require('../modules/CIStatus')

describe('CIStatus', function () {

  it('reports if passed', function () {
    var json = {
      payload: {
        status: 'success'
      }
    }
    var status = new CIStatus( json )
    expect( status.passed() ).to.be.ok
  })

  it('reports if failed', function () {
    var json = {
      payload: {
        status: 'failure'
      }
    }
    var status = new CIStatus( json )
    expect( status.failed() ).to.be.ok
  })

})