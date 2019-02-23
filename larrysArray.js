
function countInvertion(input) {
  let rs = 0;
  let stored = {};
  let len = input.length;
  for (let i = 0; i < len; i++) {
    for (let j in stored) {
      if (Number(j) > input[i]) {
        stored[j] = stored[j] + 1;
      }
    }
    stored[input[i]] = 0;
  }
  for (let i in stored) {
    rs += stored[i];
  }
  return rs;
};

'use strict';

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

// Complete the larrysArray function below.
function larrysArray(A) {
  let invertion = countInvertion(A);
  if (invertion % 2 == 0) {
    return "YES";
  }
  return "NO";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine(), 10);

        const A = readLine().split(' ').map(ATemp => parseInt(ATemp, 10));

        let result = larrysArray(A);

        ws.write(result + "\n");
    }

    ws.end();
}

