pragma solidity ^0.4.18;

contract AccountNetwork {

  struct Connection {
    bool connected;
    bool requested;
  }

  struct Account {
    uint numConnections;
    mapping(address => Connection) connections;
  }

  mapping(address => Account) private accounts;

  event NewRequest(address to, address from);

  function newRequestTo(address to) public {
    Account storage a = accounts[msg.sender];
    require(!a.connections[to].connected);
    a.connections[to].requested = true;
    NewRequest(to, msg.sender);
  }

  function acceptRequestFrom(address from) public {
    Account storage account = accounts[msg.sender];
    Account storage otherAccount = accounts[from];
    require(otherAccount.connections[msg.sender].requested);
    otherAccount.connections[msg.sender].connected = true;
    account.connections[from].connected = true;
    account.numConnections = account.numConnections + 1;
    otherAccount.numConnections = otherAccount.numConnections + 1;
  }

  function numConnectionsTo(address to) public view returns(uint) {
    return accounts[to].numConnections;
  }

  function connectedTo(address to, address from) public view returns(bool) {
    return accounts[to].connections[from].connected && accounts[from].connections[to].connected;
  }

  function disconnectFrom(address from) public {
    Account storage account = accounts[msg.sender];
    Account storage otherAccount = accounts[from];
    require(account.connections[from].connected && otherAccount.connections[msg.sender].connected);
    account.connections[from].connected = false;
    otherAccount.connections[msg.sender].connected = false;
    account.numConnections = account.numConnections - 1;
    otherAccount.numConnections = otherAccount.numConnections - 1;
  }

}