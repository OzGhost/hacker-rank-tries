'use strict';

var getKeys = function(input) {
  var currentKeys = Object.keys(input);
  var len = currentKeys.length;
  var rs = [];
  for (var i = 0; i < len; i++) {
    rs[rs.length] = +currentKeys[i];
  }
  return rs;
};

var doItv2 = function(input, non) {
  var len = input.length;
  if (len == 1) {
    return ((non == 1 && input[0] == 1) || (input[0] % non) != 0)
      ? 1
      : 0
    ;
  }
  if (len < 1) {
    return 0;
  }
  var myMap = {};
  for (var i = 0; i < len; i++) {
    var redun = input[i] % non;
    if (redun == 0 || (2*redun) == non) {
      myMap[redun] = 1;
    } else {
      var counter = myMap[redun] || 0;
      counter++;
      myMap[redun] = counter;
    }
  }
  var reduns = getKeys(myMap);
  var redunlen = reduns.length;
  var counter = 0;
  var picked = [];
  
  for (var i = 0; i < redunlen; i++){
    if (reduns[i] == 0 || (2*reduns[i]) == non) {
      counter++;
      continue;
    }
    if (picked.includes(reduns[i])) {
      continue;
    }
    var currentPoint = myMap[reduns[i]];
    var counterPoint = myMap[(non - reduns[i])] || 0;
    if (counterPoint == 0 || currentPoint >= counterPoint ) {
      counter += currentPoint;
      picked[picked.length] = non - reduns[i];
    }
  }
  return counter;
};

console.log(doItv2([19,10,12,24,25,22], 4));
//console.log(doItv2([1,7,2,4], 3));
//console.log(doItv2([1], 1));


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

// Complete the nonDivisibleSubset function below.
function nonDivisibleSubset(k, S) {
  return doItv2(S, k);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const S = readLine().split(' ').map(STemp => parseInt(STemp, 10));

    let result = nonDivisibleSubset(k, S);

    ws.write(result + "\n");

    ws.end();
}

