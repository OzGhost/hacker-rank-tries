
"use strict";

function rotate(input) {
  let len = input.length;
  if (len < 3) {
    return [input];
  }
  len--;
  let rs = [];
  let remain = input.substring(3, len+1);

  let head = input.charAt(0);
  let tail = input.charAt(1) + input.charAt(2);
  let tailRotate = rotate(tail + remain);
  for (let i in tailRotate) {
    rs[rs.length] = head + tailRotate[i];
    let subremain = tailRotate[i].substring(2, tailRotate[i].length);
    rs[rs.length] =
      tailRotate[i].charAt(0)
      + tailRotate[i].charAt(1)
      + head
      + subremain;
    rs[rs.length] =
      tailRotate[i].charAt(1)
      + head
      + tailRotate[i].charAt(0)
      + subremain;
  }

  head = input.charAt(1);
  tail = input.charAt(2) + input.charAt(0);
  tailRotate = rotate(tail + remain);
  for (let i in tailRotate) {
    rs[rs.length] = head + tailRotate[i];
    let subremain = tailRotate[i].substring(2, tailRotate[i].length);
    rs[rs.length] =
      tailRotate[i].charAt(0)
      + tailRotate[i].charAt(1)
      + head
      + subremain;
    rs[rs.length] =
      tailRotate[i].charAt(1)
      + head
      + tailRotate[i].charAt(0)
      + subremain;
  }
  
  head = input.charAt(2);
  tail = input.charAt(0) + input.charAt(1);
  tailRotate = rotate(tail + remain);
  for (let i in tailRotate) {
    rs[rs.length] = head + tailRotate[i];
    let subremain = tailRotate[i].substring(2, tailRotate[i].length);
    rs[rs.length] =
      tailRotate[i].charAt(0)
      + tailRotate[i].charAt(1)
      + head
      + subremain;
    rs[rs.length] =
      tailRotate[i].charAt(1)
      + head
      + tailRotate[i].charAt(0)
      + subremain;
  }
  return rs;
};

function weightInvertion(input) {
  let rs = 0;
  let stored = {};
  let len = input.length;
  for (let i = 0; i < len; i++) {
    for (let j in stored) {
      if (j > input.charAt(i)) {
        stored[j] = stored[j] + 1;
      }
    }
    stored[input.charAt(i)] = 0;
  }
  for (let i in stored) {
    rs += stored[i];
  }
  return rs;
};

let c = 0;
let odd = 0;
let even = 0;

function generate() {
  for (let i = 3; i < 10; i++) {
    console.log("cout << i ", i);
    let sub = "1";
    for (let j = 1; j < i; j++) {
      sub += j+1;
    }
    c++;
    let rr = rotate(sub);
    for (let j in rr) {
      let weight = weightInvertion(rr[j]);
      //console.log(""+rr[j]+ " -> " + weightInvertion(rr[j]));
      if (weight % 2 == 0) {
        even++;
      } else {
        odd++;
      }
    }
    if (c > 1) {
      //break;
    }
  }

  console.log("cout << got odd vs even", odd, even);
}

//generate();

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

console.log(countInvertion([12,1,10,2,7,11,4,14,5,9,15,8,13,6,3]));
