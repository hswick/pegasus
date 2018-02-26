const PegasusZero = artifacts.require("./PegasusZero.sol")
const rpc = require('./helpers/rpc_client')
const client = rpc.newClient()

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

  it('should make a bunch of connections', async () => {
    await pegasusZero.newConnectionRequest(accounts[2], {from: accounts[0]})
    await pegasusZero.newConnectionRequest(accounts[3], {from: accounts[0]})
    await pegasusZero.newConnectionRequest(accounts[4], {from: accounts[0]})
    await pegasusZero.newConnectionRequest(accounts[5], {from: accounts[0]})
    await pegasusZero.newConnectionRequest(accounts[6], {from: accounts[0]})
    await pegasusZero.acceptConnectionRequest(accounts[0], {from: accounts[2]})
    await pegasusZero.acceptConnectionRequest(accounts[0], {from: accounts[3]})
    await pegasusZero.acceptConnectionRequest(accounts[0], {from: accounts[4]})
    await pegasusZero.acceptConnectionRequest(accounts[0], {from: accounts[5]})
    await pegasusZero.acceptConnectionRequest(accounts[0], {from: accounts[6]})

    await pegasusZero.newConnectionRequest(accounts[3], {from: accounts[2]})
    await pegasusZero.newConnectionRequest(accounts[4], {from: accounts[2]})
    await pegasusZero.newConnectionRequest(accounts[3], {from: accounts[6]})

    await pegasusZero.acceptConnectionRequest(accounts[2], {from: accounts[3]})
    await pegasusZero.acceptConnectionRequest(accounts[2], {from: accounts[4]})
    await pegasusZero.acceptConnectionRequest(accounts[6], {from: accounts[3]})
  })

  it('should make visualization', async () => {
    let data = {x: [], y: [], z: [], message: 'init'}
    for(let i = 0; i < accounts.length; i++) {
      let [x, y, z] = (await pegasusZero.getPegasusCoordinate.call(accounts[i]))
      data.x.push(x.toNumber())
      data.y.push(y.toNumber())
      data.z.push(z.toNumber())
    }
    data['color'] = rpc.getColors(data)
    rpc.send(client, data)
  })
})