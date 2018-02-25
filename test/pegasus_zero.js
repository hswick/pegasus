const PegasusZero = artifacts.require("./PegasusZero.sol")

contract('PegasusZero', function(accounts) {
  let pegasusZero

  before(async () => {
    pegasusZero = await PegasusZero.deployed()
  })

  for(let i = 0; i < accounts.length; i++) {
    it('should make a new pegasus', async () => {
      pegasusZero.newPegasus({from: accounts[i]})
    })
  }

  it('should make a new connection request', async () => {
    await pegasusZero.newConnectionRequest(accounts[1], {from: accounts[0]})
  })

  it('should accept connection request', async () => {
    await pegasusZero.acceptConnectionRequest(accounts[0], {from: accounts[1]})

    assert.equal(1, (await pegasusZero.numConnectionsTo.call(accounts[0])).toNumber())
  })
})