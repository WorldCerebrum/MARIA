pragma solidity ^0.4.4;

contract CompetitionFactory {

  // ------ Contract member variables ------

  struct Competition {
    uint    prize;       // prize in ether (units are 'wei' so values are large: can't use uint32)
    uint    deadline;    // end of competition (denoted in Epoch Time)
    address host;        // address of host
    address winner;      // address of winner
    string  dataset;     // ipfs hash of host dataset (with test targets).
  }

  mapping (uint => mapping (address => string)) public competitionToParticipants; // competition id -> address of participant -> ipfs hash of a participant predictions
  Competition[] public competitions;                                              // vector of all competitions (past and present)
  address[] public leaderboard;                                                   // leaderboard of all winners

  event ContractDeployed      (uint _competitionId, address  _person, string  _hash, uint _cost, uint _time);
  event NewCompetition        (uint _competitionId, address  _person, string  _hash, uint _cost, uint _time);
  event NewSubmission         (uint _competitionId, address  _person, string  _hash, uint _cost, uint _time);
  event NewPayout             (uint _competitionId, address  _person, string  _hash, uint _cost, uint _time);

  // ------ Contract functions ------

  // Fallback function, allows this contract to receive ether.
  function () public payable {}

  // Constructor
  function CompetitionFactory() {
      ContractDeployed(0, msg.sender,"", msg.value, now);
   }

  // Function to create a new competition and add it to the list (winner is defaulted to host).
  function createCompetition(string _dataset, uint _deadline) public payable returns (uint _competitionId) {
    //if (_deadline <= now) throw;

    _competitionId = competitions.push(Competition(msg.value, _deadline, msg.sender, msg.sender, _dataset)) - 1;
    NewCompetition(_competitionId, msg.sender, _dataset, msg.value, now);
  }

  // Modifier that requires the competitionId to be a valid/existing one.
  modifier competitionIdCheck(uint _competitionId) {
    //if (_competitionId >= competitions.length) throw;
    _;
  }

  // Function for participants to submit the IPFS hash of their prediction data for a specific competition.
  function submitIPFSHash(string _ipfsHash, uint _competitionId) external competitionIdCheck(_competitionId) {
    //if (now >= competitions[_competitionId].deadline) throw;
    
    competitionToParticipants[_competitionId][msg.sender] = _ipfsHash;
    NewSubmission(_competitionId, msg.sender, _ipfsHash, msg.value, now);
  }

  // Function to execute the payouts of a competition.
  function executePayouts(uint _competitionId, address _winner) external competitionIdCheck(_competitionId) {
    Competition storage myCompetition = competitions[_competitionId];
    //if (now <= myCompetition.deadline) throw;

    // Determine the winner of a competition and transfer the prize, but throw if transfer fails.
    _determineWinner(_winner, _competitionId, myCompetition);
    if (!myCompetition.winner.send(myCompetition.prize)) throw;

    // Update leaderboard.
    leaderboard.push(myCompetition.winner);        
    NewPayout(_competitionId, myCompetition.winner, competitionToParticipants[_competitionId][myCompetition.winner], myCompetition.prize, now);
  }

  // TODO: winner should be calculated by an iExec oracle here, but for now the logloss is calculated off-chain and the winner passed in as an argument (from executePayouts()).
  function _determineWinner(address _winner, uint /*_competitionId*/, Competition storage _competition) private {
    _competition.winner = _winner;
  }
  
  // Get the dataset of a competition.
  function getDataset(uint _competitionId) external competitionIdCheck(_competitionId) returns (string) {
    return competitions[_competitionId].dataset;
  }

  // Get the deadline of a competition.
  function getDeadline(uint _competitionId) external competitionIdCheck(_competitionId) returns (uint) {
    return competitions[_competitionId].deadline;
  }

  // Get the prize of a competition.
  function getPrize(uint _competitionId) external competitionIdCheck(_competitionId) returns (uint) {
    return competitions[_competitionId].prize;
  }

  // Get the winner of a competition.
  function getWinner(uint _competitionId) external competitionIdCheck(_competitionId) returns (string) {
    return toAsciiString(competitions[_competitionId].winner);
  }

  // Get the host of a competition.
  function getHost(uint _competitionId) external competitionIdCheck(_competitionId) returns (address) {
    return competitions[_competitionId].host;
  }

  // Get a participant's ipfs hash for a competition.
  function getParticipantIPFSHash(uint _competitionId, address _participantAddress) external competitionIdCheck(_competitionId) returns (string) {
    return competitionToParticipants[_competitionId][_participantAddress];
  }

  // Get a competition by id.
  function getCompetition(uint _competitionId) external competitionIdCheck(_competitionId) returns (uint, uint) {
    Competition memory cmp = competitions[_competitionId];
    return (cmp.prize, cmp.deadline);
  }

  // Get the leaderboard of winners.
  function getLeaderboard() external returns (address[]) {
    return leaderboard;
  }

  // Function to convert from an address to a string representation.
  function toAsciiString(address x) returns (string) {
    bytes memory s = new bytes(40);
    for (uint i = 0; i < 20; i++) {
        byte b = byte(uint8(uint(x) / (2**(8*(19 - i)))));
        byte hi = byte(uint8(b) / 16);
        byte lo = byte(uint8(b) - 16 * uint8(hi));
        s[2*i] = char(hi);
        s[2*i+1] = char(lo);            
    }
    return string(s);
  }

  // Function to convert a byte into a char.
  function char(byte b) returns (byte c) {
    if (b < 10)
      return byte(uint8(b) + 0x30);    
    return byte(uint8(b) + 0x57);
  }

}