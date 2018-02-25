const SimpleSpace = artifacts.require("./SimpleSpace.sol")
const toPoint = require('./helpers/point')

contract('SimpleSpace', function(accounts) {
  let simpleSpace

  before(async () => {
    simpleSpace = await SimpleSpace.deployed()
  })

  for(let i = 0; i < accounts.length; i++) {
    it('should make a new point', async () => {
      await simpleSpace.newPoint({from: accounts[i]})
  
      const point = toPoint(await simpleSpace.getPointOf.call(accounts[i]))
  
      assert(1000000000 > point.x, 'x is greater than a billion')
      assert(-1000000000 < point.x, 'x is less than negative billion')
      assert(1000000000 > point.y, 'y is greater than a billion')
      assert(-1000000000 < point.y, 'y is less than negative billion')
    })
  }
})
