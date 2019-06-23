// var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var wmt = artifacts.require("./wmt.sol");

module.exports = function(deployer) {
  // deployer.deploy(SimpleStorage);
  deployer.deploy(wmt);
};
