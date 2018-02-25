var UserNetwork = artifacts.require("./UserNetwork.sol")

contract('UserNetwork', function(accounts) {
  let userNetwork

  before(async () => {
    userNetwork = await UserNetwork.deployed()
  })

  it("should create a new request", async () => {
    let tx = await userNetwork.newRequestTo(accounts[1], {from: accounts[0]})
    let request = tx.logs[0].args
    
    assert.equal(request.to, accounts[1])
    assert.equal(request.from, accounts[0])
  })

  it("should accept request", async () => {
    await userNetwork.acceptRequestFrom(accounts[0], {from: accounts[1]})

    assert.equal(1, (await userNetwork.numConnectionsTo.call(accounts[0])).toNumber())
    assert.equal(1, (await userNetwork.numConnectionsTo.call(accounts[1])).toNumber())
  })

  it("should disconnect", async () => {
    await userNetwork.disconnectFrom(accounts[1], {from: accounts[0]})

    assert.equal(0, (await userNetwork.numConnectionsTo.call(accounts[0])).toNumber())
    assert.equal(0, (await userNetwork.numConnectionsTo.call(accounts[1])).toNumber())
  })
})
