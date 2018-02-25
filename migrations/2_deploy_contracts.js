const AccountNetwork = artifacts.require("./AccountNetwork.sol");
const SimpleSpace = artifacts.require("./SimpleSpace.sol");

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(AccountNetwork)
  deployer.deploy(SimpleSpace)
}
