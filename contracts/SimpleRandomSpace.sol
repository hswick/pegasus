pragma solidity ^0.4.18;

import './Vector2D.sol';

contract SimpleRandomSpace is Vector2D {

  mapping(address => Vector2) public points;

  function newPoint() public {
    Vector2 storage p = points[msg.sender];
    require(p.x == 0x0 && p.y == 0x0);
    p.x = int(keccak256(this, msg.sender)) / 10 ** 68;
    p.y = int(keccak256(msg.sender)) / 10 ** 68;
  }

  function getPointOf(address account) public view returns (int x, int y) {
    Vector2 storage p = points[account];
    x = p.x;
    y = p.y;
  }
}