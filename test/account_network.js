const AccountNetwork = artifacts.require("./AccountNetwork.sol")

contract('AccountNetwork', function(accounts) {
  let accountNetwork

  before(async () => {
    accountNetwork = await AccountNetwork.deployed()
  })

  it("should create a new request", async () => {
    let tx = await accountNetwork.newRequestTo(accounts[1], {from: accounts[0]})
    let request = tx.logs[0].args
    
    assert.equal(request.to, accounts[1])
    assert.equal(request.from, accounts[0])
  })

  it("should accept request", async () => {
    await accountNetwork.acceptRequestFrom(accounts[0], {from: accounts[1]})

    assert.equal(1, (await accountNetwork.numConnectionsTo.call(accounts[0])).toNumber())
    assert.equal(1, (await accountNetwork.numConnectionsTo.call(accounts[1])).toNumber())
  })

  it("should disconnect", async () => {
    await accountNetwork.disconnectFrom(accounts[1], {from: accounts[0]})

    assert.equal(0, (await accountNetwork.numConnectionsTo.call(accounts[0])).toNumber())
    assert.equal(0, (await accountNetwork.numConnectionsTo.call(accounts[1])).toNumber())
  })
})
