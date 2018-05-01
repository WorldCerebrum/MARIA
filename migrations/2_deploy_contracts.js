var CompetitionFactory = artifacts.require("./CompetitionFactory.sol");

module.exports = function(deployer) {
  deployer.deploy(CompetitionFactory);
};
