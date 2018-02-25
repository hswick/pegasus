const PegasusZero = artifacts.require("./PegasusZero.sol")

contract('PegasusZero', function(accounts) {
  let pegasusZero

  before(async () => {
    pegasusZero = await PegasusZero.deployed()
  })

})