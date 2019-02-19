'use strict';

function doIt(input) {
  let rs = [];

  let filen = input.length;
  let fjlen = input[0].length;

  let ilen = filen - 1;
  let jlen = fjlen - 1;
  rs[0] = [];
  for (let i = 0; i < fjlen; i++) {
    rs[0][i] = input[0].charAt(i);
  }
  for (let i = 1; i < ilen; i++) {
    rs[i] = [];
    rs[i][0] = input[i].charAt(0);
    for (let j = 1; j < jlen; j++) {
      let candi = input[i].charAt(j);
      if (rs[i-1][j] != 'X') {
        if (
          candi > input[i-1].charAt(j)
          &&
          candi > input[i+1].charAt(j)
          &&
          candi > input[i].charAt(j-1)
          &&
          candi > input[i].charAt(j+1)
        ) {
          candi = 'X';
          rs[i][j+1] = input[i].charAt(j+1);
        }
      }
      rs[i][j] = candi;
      if (candi == 'X') {
        j++;
      }
    }
    rs[i][jlen] = input[i].charAt(jlen);
  }
  rs[ilen] = [];
  for (let i = 0; i < fjlen; i++) {
    rs[ilen][i] = input[ilen].charAt(i);
  }
  return rs;
};

function print(input) {
  let rs = '';
  let ilen = input.length;
  let jlen = input[0].length;
  for (let i = 0; i < ilen; i++) {
    for (let j = 0; j < jlen; j++) {
      rs += input[i][j];
    }
    rs += '\n';
  }
  return rs;
}

/*
console.log("\ncout << expected: \n"
          + print([
                  ['1',' ','2'],
                  ['1',' ','2']])
          + " vs \n"
          + print(doIt(['1 2','1 2'])));
console.log("\ncout << expected: \n"
          + print([
                  ['9','8','9'],
                  ['1','X','1'],
                  ['1','1','1']])
          + " vs \n"
          + print(doIt(['989','191','111'])));
console.log("\ncout << expected: \n"
          + print([
                  ['1','1','1','2'],
                  ['1','X','1','2'],
                  ['1','8','X','2'],
                  ['1','2','3', '4']])
          + " vs \n"
          + print(doIt(['1112','1912','1892','1234']))); 
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

    const n = parseInt(readLine(), 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    ws.write(print(doIt(grid)));

    ws.end();
}

