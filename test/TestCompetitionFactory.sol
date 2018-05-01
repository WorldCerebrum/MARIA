pragma solidity ^0.4.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/CompetitionFactory.sol";

contract TestCompetitionFactory {
  CompetitionFactory factory = CompetitionFactory(DeployedAddresses.CompetitionFactory());
  
  uint public initialBalance = 10 ether; // truffle automatically uses 'initialBlance' to send this amount of ether from the test account to this test contract  
  bytes32 testHash = 0x92b6222b166d49960e9fdcc680fe96e71a573ae92cd676b4b9b3a06b373d54df;
  uint prize = 1 ether;
  uint competitionId;
  
  function () public payable {} // allow this contract to receive ether, however, truffle test framework doesn't use this one

  /* Note: Tests are sequential. */

  // Testing createCompetition(), getDataset(), getPrize(), getDeadline(), getHost(), getWinner().
  function testCreateCompetition() public {
    competitionId = factory.createCompetition.value(prize)(testHash, now + 2);
    
    // Check contract balances.
    Assert.equal(DeployedAddresses.CompetitionFactory().balance, prize, "CompetitionFactory should receive the competition prize.");
    Assert.equal(this.balance, initialBalance - prize, "TestCompetitionFactory should send the competition prize.");
    
    // Check if competition parameters were properly set.
    Assert.equal(factory.getPrize(competitionId), prize,      "prize should be 1000000000000000000.");
    Assert.equal(factory.getDeadline(competitionId), now + 2, "deadline date was incorrectly set.");
    Assert.equal(factory.getHost(competitionId), this,        "competition's host should be TestCompetitionFactory.");    
    Assert.equal(factory.getWinner(competitionId), this,      "winner should be TestCompetitionFactory when a competition is created.");
    Assert.equal(factory.getDataset(competitionId), testHash, "dataset hash should be 0x92b6222b166d49960e9fdcc680fe96e71a573ae92cd676b4b9b3a06b373d54df.");
   }

  // Testing submitIPFSHash() and getParticipantIPFSHash().
  function testSubmitIPFSHash() public {
    factory.submitIPFSHash(testHash, competitionId);    
    Assert.equal(factory.getParticipantIPFSHash(competitionId, this), testHash, "The ipfs hash submitted should be the same one that is retrieved from the map.");
  }

  // Testing executePayouts() and getWinner().
  function testExecutePayouts() public {
    factory.executePayouts(competitionId, this);
    Assert.equal(DeployedAddresses.CompetitionFactory().balance, 0, "The CompetitionFactory address should pay out the competition prize.");
    Assert.equal(this.balance, initialBalance, "The TestCompetitionFactory address should recieve the competition prize.");
    Assert.equal(factory.getWinner(competitionId), this, "The winner of the competition should be the TestCompetitionFactory address.");
  }

  // TODO: Add leaderboard test cases.

}