'use strict';

let growHands = function(n, q) {
  let top = n - q[0];
  let bottom = q[0] - 1;
  let left = q[1] - 1;
  let right = n - q[1];
  return {
    'a': Math.min(top, left),
    'b': top,
    'c': Math.min(top, right),
    'd': left,
    'e': right,
    'f': Math.min(bottom, left),
    'g': bottom,
    'h': Math.min(bottom, right)
  };
};

/*
 * a b c
 * d . e
 * f g h
 */

let cutHands = function(q, hands, blades) {
  let len = blades.length;
  for (let i = 0; i < len; i++) {
    let dy = q[0] - blades[i][0];
    let dx = q[1] - blades[i][1];
    if (dx == 0) { // same col
      if (dy > 0) { // g
        hands.g = Math.min(hands.g, (dy-1));
      } else { // b
        hands.b = Math.min(hands.b, (-1)*(dy+1));
      }
    } else if (dy == 0) { // same row
      if (dx > 0) { // d
        hands.d = Math.min(hands.d, (dx-1));
      } else { // e
        hands.e = Math.min(hands.e, (-1)*(dx+1));
      }
    } else if (Math.abs(dx) == Math.abs(dy)) { // in diagonals 
      if (dx > 0 && dy > 0) { // f
        hands.f = Math.min(hands.f, (dx-1));
      } else if (dx < 0 && dy < 0) { // c
        hands.c = Math.min(hands.c, (-1)*(dx+1));
      } else if (dx > 0 && dy < 0) { // a
        hands.a = Math.min(hands.a, (dx-1));
      } else if (dx < 0 && dy > 0) { // h
        hands.h = Math.min(hands.h, (dy-1));
      }
    }
  }
};

let measureHands = function(hands) {
  let handsLengths = Object.values(hands);
  let len = handsLengths.length;
  let rs = 0;
  for (let i = 0; i < len; i++) {
    rs += handsLengths[i];
  }
  return rs;
};

let doIt = function(n, q, obs){
  let hands = growHands(n, q);
  cutHands(q, hands, obs);
  return measureHands(hands);
};

/*
console.log("cout << expected: 9 vs ", doIt(4, [4,4], []));
console.log("cout << expected: 10 vs ", doIt(5, [4,3], [
  [5,5],
  [4,2],
  [2,3],
]));
console.log("cout << expected: 0 vs ", doIt(1, [1,1], []));
*/

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the queensAttack function below.
function queensAttack(n, k, r_q, c_q, obstacles) {
  return doIt(n, [r_q, c_q], obstacles);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const nk = readLine().split(' ');
    const n = parseInt(nk[0], 10);
    const k = parseInt(nk[1], 10);
    const r_qC_q = readLine().split(' ');
    const r_q = parseInt(r_qC_q[0], 10);
    const c_q = parseInt(r_qC_q[1], 10);
    let obstacles = Array(k);
    for (let i = 0; i < k; i++) {
        obstacles[i] = readLine().split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    }
    let result = queensAttack(n, k, r_q, c_q, obstacles);
    ws.write(result + "\n");
    ws.end();
}

