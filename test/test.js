import 'babel/polyfill'
import cookie from '../src/index'
import {expect} from 'chai'

describe('cookie basics', () => {
  it('should exist', (done) => {
    expect(cookie).to.be.function
    done()
  })
})

describe('cookie(name, value)', () => {
  it('should set a cookie', (done) => {
    cookie('name', 'tobi')
    expect(cookie('name')).to.equal('tobi')

    cookie('species', 'ferret')
    expect(cookie('species')).to.equal('ferret')
    done()
  })

  it('should escape', (done) => {
    cookie('name', 'tobi ferret')
    expect(document.cookie.indexOf('name=tobi%20ferret')).to.be.positive
    done()
  })

  it('should unescape', (done) => {
    cookie('full name', 'tobi ferret')
    expect(cookie('full name')).to.equal('tobi ferret')
    done()
  })

  it('should ignore URIError', (done) => {
    cookie('bad', '%')
    cookie('bad', null)
    done()
  })

  describe('when undefined', () => {
    it('should return undefined', (done) => {
      expect(cookie('whatever')).to.be.undefined
      done()
    })
  })
})

describe('cookie(name, null)', () => {
  it('should clear the cookie', (done) => {
    cookie('type', 'ferret')
    cookie('type', null)
    expect(cookie('type')).to.be.undefined
    done()
  })

  it('should not be returned in the cookie() object', (done) => {
    cookie('full name', null)
    cookie('mydb', null)
    cookie('species', null)
    cookie('name', '0')
    var obj = cookie()
    expect(obj).to.have.all.keys(['name'])
    expect(obj.name).to.be.zero
    done()
  })

  it('should ignore URIError and return null', (done) => {
    document.cookie = 'bad=%'
    expect(cookie('bad')).to.be.null
    done()
  })
})

describe('cookie()', () => {
  it('should return all cookies', (done) => {
    cookie('name', 'loki')
    cookie('species', 'ferret')
    var obj = cookie()
    expect(obj.name).to.be.equal('loki')
    expect(obj.species).to.be.equal('ferret')
    done()
  })

  it('should return all cookies and ignore URIErrors', (done) => {
    cookie('name', 'loki')
    cookie('species', 'ferret')
    document.cookie = 'bad=%'
    var obj = cookie()
    expect(obj.name).to.be.equal('loki')
    expect(obj.species).to.be.equal('ferret')
    expect(obj.bad).to.be.null
    done()
  })
})
