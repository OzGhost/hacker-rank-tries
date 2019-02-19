'use strict';

var growSize = function(m) {
  var typeSizes = {};
  var conSizes = {};

  var ilen = m.length;
  for (var i = 0; i < ilen; i++) {
    var jlen = m[i].length;
    var tmp = 0;
    for (var j = 0; j < jlen; j++) {
      tmp += m[i][j];
      typeSizes[j] = m[i][j] + (typeSizes[j] || 0);
    }
    conSizes[i] = tmp;
  }
  return [typeSizes, conSizes];
};

var wasFit = function(s) {
  var tsize = Object.values(s[0]);
  var csize = Object.values(s[1]);
  
  var ilen = tsize.length;
  var jlen = csize.length;
  for (var i = 0; i < ilen; i++) {
    var fulfilled = false;
    for (var j = 0; j < jlen; j++) {
      if (csize[j] == tsize[i]) {
        csize[j] = -1;
        fulfilled = true;
        break;
      }
    }
    if (!fulfilled) {
      return false;
    }
  }
  return true;
};

var doIt = function(m) {
  var sizes = growSize(m);
  return wasFit(sizes);
};

/*
console.log("cout << expect: true vs ", doIt([[1,1],[1,1]]));
console.log("cout << expect: false vs ", doIt([[0,2],[1,1]]));
console.log("cout << expect: false vs ", doIt([[1,3,1], [2,1,2],[3,3,3]]));
console.log("cout << expect: true vs ", doIt([[0,2,1],[1,1,1],[2,0,0]]));
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

// Complete the organizingContainers function below.
function organizingContainers(container) {
  return doIt(container)
    ? "Possible"
    : "Impossible";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const q = parseInt(readLine(), 10);
    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine(), 10);
        let container = Array(n);
        for (let i = 0; i < n; i++) {
            container[i] = readLine().split(' ').map(containerTemp => parseInt(containerTemp, 10));
        }
        let result = organizingContainers(container);
        ws.write(result + "\n");
    }
    ws.end();
}

