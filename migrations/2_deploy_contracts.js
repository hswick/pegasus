const AccountNetwork = artifacts.require("./AccountNetwork.sol")
const SimpleSpace = artifacts.require("./SimpleSpace.sol")
const PegasusZero = artifacts.require("./PegasusZero.sol")

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(AccountNetwork)
  deployer.deploy(SimpleSpace)
  
  deployer.link(AccountNetwork, PegasusZero)
  deployer.link(SimpleSpace, PegasusZero)
  deployer.deploy(PegasusZero)
}
