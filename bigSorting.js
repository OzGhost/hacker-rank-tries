'use strict';

function compare(a, b) {
  let alen = a.length;
  let blen = b.length;
  if (alen < blen) {
    return -1;
  }
  if (alen > blen) {
    return 1;
  }
  for (let i = 0; i < alen; i++) {
    if (a.charAt(i) < b.charAt(i)) {
      return -1;
    }
    if (a.charAt(i) > b.charAt(i)) {
      return 1;
    }
  }
  return 0;
}

function qSort(input) {
  let len = input.length;
  if (len == 0) {
    //console.log("got empty");
    return "";
  }
  if (len == 1) {
    //console.log("got only one:", input[0]);
    return input[0]+"\n";
  }
  let k = input[(Math.floor(Math.random()*len))];
  let head = [];
  let body = [];
  let tail = [];
  for (let i in input) {
    let cr = compare(input[i], k);
    if (cr == 0) {
      body[body.length] = input[i];
    } else if (cr == 1) {
      tail[tail.length] = input[i];
    } else {
      head[head.length] = input[i];
    }
  }
  /*
  console.log("got k: ", k);
  console.log("got head: ", head);
  console.log("got tail: ", tail);
  console.log("got body: ", body);
  */
  let sortedHead = qSort(head);
  let sortedTail = qSort(tail);
  let bodyInUse = "";
  len = body.length;
  for (let i = 0; i < len; i++) {
    bodyInUse += k + "\n";
  }
  return sortedHead + bodyInUse + sortedTail
}

/*
console.log(qSort(
[
"31415926535897932384626433832795",
"1",
"3",
"10",
"3",
"5"
]
));

console.log(qSort(
[
"1",
"2",
"100",
"12303479849857341718340192371",
"3084193741082937",
"3084193741082938",
"111",
"200"
]
));
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

    let unsorted = [];

    for (let i = 0; i < n; i++) {
        const unsortedItem = readLine();
        unsorted.push(unsortedItem);
    }

    let result = qSort(unsorted);

    ws.write(result);

    ws.end();
}

