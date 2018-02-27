const SimpleRandomSpace = artifacts.require("./SimpleRandomSpace.sol")
const toPoint = require('./helpers/point')

const billion = 1000000000

contract('SimpleRandomSpace', function(accounts) {
  let simpleRandomSpace

  before(async () => {
    simpleRandomSpace = await SimpleRandomSpace.deployed()
  })

  for(let i = 0; i < accounts.length; i++) {
    it('should make a new point', async () => {
      await simpleRandomSpace.newPoint({from: accounts[i]})
  
      const point = toPoint(await simpleRandomSpace.getPointOf.call(accounts[i]))
  
      // assert(billion > point.x, 'x is greater than a billion')
      // assert(-billion < point.x, 'x is less than negative billion')
      // assert(billion > point.y, 'y is greater than a billion')
      // assert(-billion < point.y, 'y is less than negative billion')
    })
  }
})