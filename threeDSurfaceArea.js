'use strict';

function doIt(input) {
  let h = input.length;
  let w = input[0].length;
  let rs = 2*h*w;
  let rw = w - 1;
  let rh = h - 1;
  for (let i = 0; i < h; i++) {
    rs += input[i][0] + input[i][rw];
  }
  for (let i = 0; i < w; i++) {
    rs += input[0][i] + input[rh][i];
  }
  for (let i = 1; i < h; i++) {
    for (let j = 1; j < w; j++) {
      rs += Math.abs(input[i][j] - input[i][j-1])
            + Math.abs(input[i][j] - input[i-1][j]);
    }
  }
  for (let i = 1; i < w; i++) {
    rs += Math.abs(input[0][i] - input[0][i-1]);
  }
  for (let i = 1; i < h; i++) {
    rs += Math.abs(input[i][0] - input[i-1][0]);
  }
  return rs;
};

/*
console.log("cout << expected:  6 vs " + doIt([[1]]));
console.log("cout << expected: 60 vs " + doIt([
  [1,3,4],
  [2,2,3],
  [1,2,4]
]));
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

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const HW = readLine().split(' ');

    const H = parseInt(HW[0], 10);

    const W = parseInt(HW[1], 10);

    let A = Array(H);

    for (let i = 0; i < H; i++) {
        A[i] = readLine().split(' ').map(ATemp => parseInt(ATemp, 10));
    }

    let result = doIt(A);

    ws.write(result + "\n");

    ws.end();
}

