'use strict';

var commonPrefixCount = function (a, b) {
  var len = Math.min(a.length, b.length);
  var counter = 0;
  for (var i = 0; i < len; i++) {
    if (a.charAt(i) === b.charAt(i)) {
      counter++;
    } else {
      return counter;
    }
  }
  return counter;
};


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

// Complete the appendAndDelete function below.
function appendAndDelete(s, t, k) {
  var olen = s.length;
  var blen = t.length;

  if (k >= (olen + blen)) {
    return "Yes";
  }

  var commonLength = commonPrefixCount(s, t);
  var oleft = olen - commonLength;
  var bleft = blen - commonLength;

  if (k == (oleft + bleft)) {
    return "Yes";
  }

  if (k > (oleft + bleft)) {
    return (((k - oleft - bleft) % 2) == 0)
            ? "Yes"
            : "No"
    ;
  }

  return "No";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const t = readLine();

    const k = parseInt(readLine(), 10);

    let result = appendAndDelete(s, t, k);

    ws.write(result + "\n");

    ws.end();
}

