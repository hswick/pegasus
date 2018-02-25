pragma solidity ^0.4.18;

contract SimpleSpace {
  
  struct Point {
    int x;
    int y;
  }

  mapping(address => Point) points;

  function newPoint() public {
    Point storage p = points[msg.sender];
    require(p.x == 0x0 && p.y == 0x0);
    p.x = int(keccak256(this, msg.sender));
    p.y = int(keccak256(msg.sender));
  }

  function getPointOf(address account) public view returns (int x, int y) {
    Point storage p = points[account];
    x = p.x;
    y = p.y;
  }
}