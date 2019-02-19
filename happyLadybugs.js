'use strict';

function happyLadybugs(input) {
  let len = input.length;
  let free = false;
  let candiCounter = {};
  let fine = true;
  let previous = '';
  let prevCount = 0;
  for (let i = 0; i < len; i++) {
    if (input[i] == '_') {
      free = true;
    } else {
      candiCounter[input[i]] = 1 + (candiCounter[input[i]] || 0);
      if (fine) {
        if (previous != input[i] && previous != '') {
          if (prevCount < 2) {
            fine = false;
          } else {
            prevCount = 1;
          }
        } else {
          prevCount++;
        }
        previous = input[i];
      }
    }
  }
  if (prevCount < 2) {
    fine = false;
  }
  if (fine) {
    return 'YES';
  }
  if (!free) {
    return 'NO';
  }
  let candiNum = Object.values(candiCounter);
  len = candiNum.length;
  for (let i = 0; i < len; i++) {
    if (candiNum[i] == 1) {
      return 'NO';
    }
  }
  return 'YES';
};

/*
console.log("cout << expected: YES vs", doIt("YYR_B_BR"));
console.log("cout << expected: YES vs", doIt("RBY_YBR"));
console.log("cout << expected:  NO vs", doIt("X_Y__X"));
console.log("cout << expected: YES vs", doIt("__"));
console.log("cout << expected: YES vs", doIt("B_RRBR"));
console.log("cout << expected:  NO vs", doIt("AABBC"));
console.log("cout << expected: YES vs", doIt("AABBC_C"));
console.log("cout << expected: YES vs", doIt("_"));
console.log("cout << expected: YES vs", doIt("DD__FQ_QQF"));
console.log("cout << expected:  NO vs", doIt("AABCBC"));
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

    const g = parseInt(readLine(), 10);

    for (let gItr = 0; gItr < g; gItr++) {
        const n = parseInt(readLine(), 10);

        const b = readLine();

        let result = happyLadybugs(b);

        ws.write(result + "\n");
    }

    ws.end();
}


