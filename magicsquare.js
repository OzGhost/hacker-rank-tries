'use strict';

var availableMagicSquare = [
  [ 2, 7, 6, 9, 5, 1, 4, 3, 8 ],
  [ 2, 9, 4, 7, 5, 3, 6, 1, 8 ],
  [ 4, 3, 8, 9, 5, 1, 2, 7, 6 ],
  [ 4, 9, 2, 3, 5, 7, 8, 1, 6 ],
  [ 6, 1, 8, 7, 5, 3, 2, 9, 4 ],
  [ 6, 7, 2, 1, 5, 9, 8, 3, 4 ],
  [ 8, 1, 6, 3, 5, 7, 4, 9, 2 ],
  [ 8, 3, 4, 1, 5, 9, 6, 7, 2 ]
];

var costBase = function(normalSquare, magicSquare) {
  var cost = 0;
  for (var i = 0; i < 9; i++) {
    cost += Math.abs(normalSquare[i] - magicSquare[i]);
  }
  return cost;
};



const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the formingMagicSquare function below.
function formingMagicSquare(s) {
  var minCost = 81;
  var len = availableMagicSquare.length;
  for (let i = 0; i < len; i++) {
    minCost = Math.min(costBase(s, availableMagicSquare[i]), minCost);
  }
  return minCost;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let s = [];

    for (let i = 0; i < 3; i++) {
        let tmp = readLine().split(' ').map(sTemp => parseInt(sTemp, 10));
        s[s.length] = tmp[0];
        s[s.length] = tmp[1];
        s[s.length] = tmp[2];
    }

    const result = formingMagicSquare(s);

    ws.write(result + '\n');

    ws.end();
}

