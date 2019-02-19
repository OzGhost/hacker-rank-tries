'use strict';

let countMatching = function(x, d) {
  let fallbacks = buildFallbacks(x);
  let j = 0;
  let k = 0;
  let dlen = d.length;
  let xlen = x.length;
  let matching = 0;
  while (j < d.length) {
    if (x.charAt(k) == d.charAt(j)) {
      k++;
      j++;
      if (k == xlen) {
        matching++;
        k = fallbacks[k];
      }
    } else {
      k = fallbacks[k];
      if (k < 0) {
        k = 0;
        j++;
      }
    }
  }
  return matching;
};

let buildFallbacks = function(x) {
  let T = [-1];
  let pos = 1;
  let cnd = 0;
  let xlen = x.length;
  while (pos < xlen) {
    if (x.charAt(pos) == x.charAt(cnd)) {
      T[pos] = T[cnd];
    } else {
      T[pos] = cnd;
      cnd = T[cnd]
      while (cnd >= 0 && x.charAt(pos) != x.charAt(cnd)) {
        cnd = T[cnd];
      }
    }
    pos++;
    cnd++;
  }
  T[pos] = cnd;
  return T;
};

const fs = require('fs');

let pickupHeathScoreOfUsableGenes = function(g, h, s, e) {
  let rs = {};
  for (let i = s; i <= e; i++) {
    rs[g[i]] = h[i] + (rs[g[i]] || 0);
  }
  return rs;
};

let doScoring = function(ghs, d) {
  let genes = Object.keys(ghs);
  let len = genes.length;
  let score = 0;
  for (let i = 0; i < len; i++) {
    score += ghs[genes[i]] * countMatching(genes[i], d);
  }
  return score;
};

let score = function(g, h, s, e, d){
  let ghs = pickupHeathScoreOfUsableGenes(g, h, s, e);
  return doScoring(ghs, d);
};

/*
console.log("cout << expected: 19 vs ", score(
  ['a','b','c','aa','d','b'],
  [1,2,3,4,5,6],
  1, 5, 'caaab'
));
console.log("cout << expected: 0 vs ", score(
  ['a','b','c','aa','d','b'],
  [1,2,3,4,5,6],
  0, 4, 'xyz'
));
console.log("cout << expected: 11 vs ", score(
  ['a','b','c','aa','d','b'],
  [1,2,3,4,5,6],
  2, 4, 'bcdybc'
));
*/

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
  const n = parseInt(readLine(), 10);
  const genes = readLine().split(' ');
  const health = readLine().split(' ').map(healthTemp => parseInt(healthTemp, 10));
  const s = parseInt(readLine(), 10);
  let scores = [];
  for (let sItr = 0; sItr < s; sItr++) {
    const firstLastd = readLine().split(' ');
    const first = parseInt(firstLastd[0], 10);
    const last = parseInt(firstLastd[1], 10);
    const d = firstLastd[2];
    scores[scores.length] = score(genes, health, first, last, d);
  }
  let min = scores[0];
  let max = scores[0];
  for (let i = 1; i < s; i++) {
    if (scores[i] < min) {
      min = scores[i];
    }
    if (scores[i] > max) {
      max = scores[i];
    }
  }
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
  ws.write(min + " " + max + "\n");
  ws.end();
}

