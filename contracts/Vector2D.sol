pragma solidity ^0.4.18;

contract Vector2D {

  struct Vector2 {
    int x;
    int y;
  }

  function add(Vector2 v0, Vector2 v1) internal pure returns (Vector2 newVec) {
    newVec.x = v0.x + v1.x;
    newVec.y = v0.y + v1.y;
  }

  function add(Vector2 v0, int n) internal pure returns (Vector2 newVec) {
    newVec.x = v0.x + n;
    newVec.y = v0.y + n;
  }

  function sub(Vector2 v0, Vector2 v1) internal pure returns (Vector2 newVec) {
    newVec.x = v0.x - v1.x;
    newVec.y = v0.y - v1.y;
  }

  function sub(Vector2 v0, int n) internal pure returns (Vector2 newVec) {
    newVec.x = v0.x - n;
    newVec.y = v0.y - n;
  }

  function mul(Vector2 v0, Vector2 v1) internal pure returns (Vector2 newVec) {
    newVec.x = v0.x * v1.x;
    newVec.y = v0.y * v1.y;
  }

  function mul(Vector2 v0, int n) internal pure returns (Vector2 newVec) {
    newVec.x = v0.x * n;
    newVec.y = v0.y * n;
  }

  function div(Vector2 v0, Vector2 v1) internal pure returns (Vector2 newVec) {
    newVec.x = v0.x / v1.x;
    newVec.y = v0.y / v1.y;
  }

  function div(Vector2 v0, int n) internal pure returns (Vector2 newVec) {
    newVec.x = v0.x / n;
    newVec.y = v0.y / n;
  }

  //Convert vector into unit vector
  function norm(Vector2 v) internal pure returns (Vector2) {
    return div(v, sqrt((v.x * v.x) + (v.y * v.y)));
  }

  //could optimize for range of possible values
  function sqrt(int x) internal pure returns (int y) {
    int z = (x + 1) / 2;
    y = x;
    while (z < y) {
        y = z;
        z = (x / z + z) / 2;
    }
  }
}