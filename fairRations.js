'use strict';

function doIt(s) {
  let loaves = 0;
  let k = -1;
  let len = s.length;
  for (let i = 0; i < len; i++) {
    if (s[i] % 2 != 0) {
      if (k == -1) {
        k = i;
      } else {
        loaves += 2 * (i - k);
        k = -1;
      }
    }
  }
  if (k == -1) {
    return loaves;
  }
  return -1;
};

/*
console.log("cout << expected: 4 vs ", doIt([4,5,6,7]));
console.log("cout << expected: 4 vs ", doIt([2,3,4,5,6]));
console.log("cout << expected: -1 vs ", doIt([1,2]));
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

function fairRations(B) {
  let rs = doIt(B);
  if (rs == -1) {
    return "NO";
  }
  return rs;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const N = parseInt(readLine(), 10);

    const B = readLine().split(' ').map(BTemp => parseInt(BTemp, 10));

    let result = fairRations(B);

    ws.write(result + "\n");

    ws.end();
}

