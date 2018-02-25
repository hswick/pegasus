const AccountNetwork = artifacts.require("./AccountNetwork.sol");

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(AccountNetwork)
}
