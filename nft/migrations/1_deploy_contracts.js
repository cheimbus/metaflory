const ConvertLib = artifacts.require("ConvertLib");
const Metafloris = artifacts.require("Metafloris");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, Metafloris);
  deployer.deploy(Metafloris);
};
