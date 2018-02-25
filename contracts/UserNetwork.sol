pragma solidity ^0.4.18;

contract UserNetwork {

  struct Connection {
    bool connected;
    bool requested;
  }

  struct User {
    uint numConnections;
    mapping(address => Connection) connections;
  }

  mapping(address => User) private users;

  event NewRequest(address to, address from);

  function newRequestTo(address to) public {
    User storage u = users[msg.sender];
    require(!u.connections[to].connected);
    u.connections[to].requested = true;
    NewRequest(to, msg.sender);
  }

  function acceptRequestFrom(address from) public {
    User storage otherUser = users[from];
    User storage user = users[msg.sender];
    require(otherUser.connections[msg.sender].requested);
    otherUser.connections[msg.sender].connected = true;
    user.connections[from].connected = true;
    user.numConnections = user.numConnections + 1;
    otherUser.numConnections = otherUser.numConnections + 1;
  }

  function numConnectionsTo(address to) public view returns(uint) {
    return users[to].numConnections;
  }

  function connectedTo(address to, address from) public view returns(bool) {
    return users[to].connections[from].connected && users[from].connections[to].connected;
  }

  function disconnectFrom(address from) public {
    User storage user = users[msg.sender];
    User storage otherUser = users[from];
    require(user.connections[from].connected && otherUser.connections[msg.sender].connected);
    user.connections[from].connected = false;
    otherUser.connections[msg.sender].connected = false;
    user.numConnections = user.numConnections - 1;
    otherUser.numConnections = otherUser.numConnections - 1;
  }

}