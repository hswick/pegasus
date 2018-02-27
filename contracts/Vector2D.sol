pragma solidity ^0.4.18;

contract Vector2D {

  struct Vector2 {
    int x;
    int y;
  }

  function add(Vector2 v0, Vector2 v1) internal returns (Vector2 newVec) {
    newVec.x = v0.x + v1.x;
    newVec.y = v0.y + v1.y;
  }

  function add(Vector2 v0, int n) internal returns (Vector2 newVec) {
    newVec.x = v0.x + n;
    newVec.y = v0.y + n;
  }

  function sub(Vector2 v0, Vector2 v1) internal returns (Vector2 newVec) {
    newVec.x = v0.x - v1.x;
    newVec.y = v0.y - v1.y;
  }

  function sub(Vector2 v0, int n) internal returns (Vector2 newVec) {
    newVec.x = v0.x - n;
    newVec.y = v0.y - n;
  }

  function mul(Vector2 v0, Vector2 v1) internal returns (Vector2 newVec) {
    newVec.x = v0.x * v1.x;
    newVec.y = v0.y * v1.y;
  }

  function mul(Vector2 v0, int n) internal returns (Vector2 newVec) {
    newVec.x = v0.x * n;
    newVec.y = v0.y * n;
  }

  function div(Vector2 v0, Vector2 v1) internal returns (Vector2 newVec) {
    newVec.x = v0.x / v1.x;
    newVec.y = v0.y / v1.y;
  }

  function div(Vector2 v0, int n) internal returns (Vector2 newVec) {
    newVec.x = v0.x / n;
    newVec.y = v0.y / n;
  }

  //Convert vector into unit vector
  function norm(Vector2 v) internal returns (Vector2) {
    return div(v, int(sqrt(uint(v.x * v.x) + uint(v.y * v.y))));
  }

    function sqrt(uint x) returns (uint y) {
        if (x == 0) return 0;
        else if (x <= 3) return 1;
        uint z = (x + 1) / 2;
        y = x;
        while (z < y)
        /// @why3 invariant { to_int !_z = div ((div (to_int arg_x) (to_int !_y)) + (to_int !_y)) 2 }
        /// @why3 invariant { to_int arg_x < (to_int !_y + 1) * (to_int !_y + 1) }
        /// @why3 invariant { to_int arg_x < (to_int !_z + 1) * (to_int !_z + 1) }
        /// @why3 variant { to_int !_y }
        {
            y = z;
            z = (x / z + z) / 2;
        }
    }

}