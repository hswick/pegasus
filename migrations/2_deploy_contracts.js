const UserNetwork = artifacts.require("./UserNetwork.sol");

module.exports = function(deployer) {
  // deployer.deploy(ConvertLib);
  // deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(UserNetwork)
}
