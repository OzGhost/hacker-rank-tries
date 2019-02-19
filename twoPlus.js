'use strict';

function isOverlap(x, y, wx, wy) {
  let total_w = wx+wy;
  let hori_xy = Math.abs(x[1] - y[1]);
  if (hori_xy > total_w) {
    return false;
  }
  let verti_xy = Math.abs(x[0] - y[0]);
  if (verti_xy > total_w) {
    return false;
  }
  if (hori_xy == 0 || verti_xy == 0){
    return true;
  }
  hori_xy--;
  verti_xy--;
  if (hori_xy < wx && verti_xy < wy) {
    return true;
  }
  if (hori_xy < wy && verti_xy < wx) {
    return true;
  }
  return false;
};

isOverlap([1,1], [1,4], 1, 1);

function interactable(a, b, wx, wy) {
  let alen = a.length;
  let blen = b.length;
  for (let i = 0; i < alen; i++) {
    for (let j = 0; j < blen; j++) {
      //console.log("cout << try: ", a[i], b[j]);
      if (!isOverlap(a[i], b[j], wx, wy)) {
        //console.log("cout << found!");
        return true;
      }
    }
  }
  return false;
}

function doIt(input){
  let ps = {};
  let ilen = input.length;
  let jlen = input[0].length;
  for (let i = 0; i < ilen; i++) {
    for(let j = 0; j < jlen; j++) {
      if (input[i].charAt(j) == 'B')
        continue;
      let wl = 1;
      while (
        (i+wl) < ilen
        &&
        (i-wl) >= 0
        &&
        (j+wl) < jlen
        &&
        (j-wl) >= 0
        &&
        input[i+wl].charAt(j) == 'G'
        &&
        input[i-wl].charAt(j) == 'G'
        &&
        input[i].charAt(j+wl) == 'G'
        &&
        input[i].charAt(j-wl) == 'G'
      ) {
        wl++;
      }
      ps[(wl-1)] = ps[(wl-1)] || [];
      ps[(wl-1)].push([i, j]);
    }
  }

  //console.log(ps);

  let wlens = Object.keys(ps);
  let maxWingLen = wlens[0];
  ilen = wlens.length;
  for (let i = 1; i < ilen; i++) {
    if (wlens[i] > maxWingLen) {
      maxWingLen = wlens[i];
    }
  }

  let orderedWingLens = [];
  let candi = Number(maxWingLen)
  orderedWingLens[0] = candi;
  candi--;
  while (candi >= 0) {
    if (ps[candi]) {
      orderedWingLens[orderedWingLens.length] = candi;
    }
    candi--;
  }

  let subWingLen = 0;
  ilen = orderedWingLens.length;
  for (let i = 0; i < ilen; i++) {
    for (let j = i; j < ilen; j++) {
      let wx = orderedWingLens[i];
      let wy = orderedWingLens[j];
      if (interactable(ps[wx], ps[wy], wx, wy)) {
        return (wx*4 + 1) * (wy*4 + 1);
      }
    }
  }
  
  return 0;
};

/*
console.log("cout << expected:  5 vs " + doIt([
  "GGGGGG",
  "GBBBGB",
  "GGGGGG",
  "GGBBGB",
  "GGGGGG"
]));

console.log("cout << expected: 25 vs " + doIt([
  "BGBBGB",
  "GGGGGG",
  "BGBBGB",
  "GGGGGG",
  "BGBBGB",
  "BGBBGB"
]));

console.log("cout << expected: 45 vs " + doIt([
  "GBGBGGB",
  "GBGBGGB",
  "GBGBGGB",
  "GGGGGGG",
  "GGGGGGG",
  "GBGBGGB",
  "GBGBGGB"
]));
*/

/**
  * 0 1 2 3 4 5 6 
 0* + _ + _ + + _ 
 1* + _ 0 _ + + _ 
 2* + _ 0 _ + + _ 
 3* 0 0 0 0 0 + + 
 4* + + 0 + + + + 
 5* + _ 0 _ + + _ 
 6* + _ + _ + + _ 
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

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    let result = doIt(grid);

    ws.write(result + "\n");

    ws.end();
}

