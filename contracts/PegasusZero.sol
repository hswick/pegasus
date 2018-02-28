pragma solidity ^0.4.18;

import './AccountNetwork.sol';
import './SimpleRandomSpace.sol';

contract PegasusZero is AccountNetwork, SimpleRandomSpace {
  
  function newPegasus() public {
    require(points[msg.sender].x == 0x0 && points[msg.sender].y == 0x0);
    newPoint();
  }

  function getPegasusCoordinate(address pegasus) public view returns (int x, int y, uint z) {
    Vector2 storage p = points[pegasus];
    return (p.x, p.y, numConnectionsTo(pegasus));
  }

  function newConnectionRequest(address pegasus) public {
    newRequestTo(pegasus);
  }

  function acceptConnectionRequest(address pegasus) public {
   acceptRequestFrom(pegasus);
   attract(points[msg.sender], points[pegasus]);
  }

  function removeConnection(address pegasus) public {
    disconnectFrom(pegasus);
    repel(points[msg.sender], points[pegasus]);
  }

  function attract(Vector2 storage v0, Vector2 storage v1) internal {
   Vector2 memory temp;
   temp.x = v0.x;
   temp.y = v0.y;
   Vector2 memory delta = moveTowards(v0, v1, int(10 ** 76));
   v0.x = delta.x;
   v0.y = delta.y;
   Vector2 memory delta2 = moveTowards(v1, temp, int(10 ** 76));
   v1.x = delta2.x;
   v1.y = delta2.y;
  }

  // Vector2D a_moved = a.add(b.subtract(a).norm().multiply(d));
  function moveTowards(Vector2 v0, Vector2 v1, int scalar) internal returns (Vector2 newVec) {
    newVec = add(v0, mul(norm(sub(v1, v0)), scalar));
  }

  function repel(Vector2 storage v0, Vector2 storage v1) internal {
   Vector2 memory temp;
   temp.x = v0.x;
   temp.y = v0.y;
   Vector2 memory delta = moveAway(v0, v1, int(10**9));
   v0.x = delta.x;
   v0.y = delta.y;
   Vector2 memory delta2 = moveAway(v1, temp, int(10**9));
   v1.x = delta2.x;
   v1.y = delta2.y;
  }

  // Vector2D a_moved = a.add(b.subtract(a).norm().multiply(d));
  function moveAway(Vector2 v0, Vector2 v1, int scalar) internal returns (Vector2 newVec) {
    newVec = sub(v0, mul(norm(sub(v1, v0)), scalar));
  }
}