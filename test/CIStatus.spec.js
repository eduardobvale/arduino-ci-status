var expect = require('chai').expect

var CiStatus = require('../modules/CiStatus')

describe('CiStatus', function () {

  it('fails miserably', function () {
    expect( false ).to.be.ok
  })

  it('raises and error if the JSON is invalid', function () {
    var json = {}
    expect(function(){
      new CiStatus( json )
    }).to.throw()
  })

  it('reports if passed', function () {
    var json = {
      payload: {
        status: 'success'
      }
    }
    var status = new CiStatus( json )
    expect( status.passed() ).to.be.ok
  })

  it('reports if failed', function () {
    var json = {
      payload: {
        status: 'failure'
      }
    }
    var status = new CiStatus( json )
    expect( status.failed() ).to.be.ok
  })

})