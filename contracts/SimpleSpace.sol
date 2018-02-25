pragma solidity ^0.4.18;

contract SimpleSpace {
  
  struct Point {
    int32 x;
    int32 y;
  }

  mapping(address => Point) points;

  function newPoint() public {
    Point storage p = points[msg.sender];
    require(p.x == 0x0 && p.y == 0x0);
    p.x = int32(int(keccak256(this, msg.sender)) / 10 ** 68);
    p.y = int32(int(keccak256(msg.sender)) / 10 ** 68);
  }

  function getPointOf(address account) public view returns (int32 x, int32 y) {
    Point storage p = points[account];
    x = p.x;
    y = p.y;
  }
}