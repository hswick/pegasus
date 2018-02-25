const AccountNetwork = artifacts.require("./AccountNetwork.sol")
const SimpleRandomSpace = artifacts.require("./SimpleRandomSpace.sol")
const PegasusZero = artifacts.require("./PegasusZero.sol")
const Vector2D = artifacts.require('./Vector2D.sol')

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(AccountNetwork)

  deployer.deploy(Vector2D)
  deployer.link(Vector2D, SimpleRandomSpace)
  deployer.deploy(SimpleRandomSpace)
  
  deployer.link(AccountNetwork, PegasusZero)
  deployer.link(SimpleRandomSpace, PegasusZero)
  deployer.deploy(PegasusZero)
}
