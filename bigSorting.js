
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
    return "";
  }
  if (len == 1) {
    return input[0]+"\n";
  }
  let k = input[(Math.floor(Math.random()*len))];
  let head = [];
  let body = [];
  let tail = [];
  for (let i in input) {
    let cr = compare(k, input[i]);
    if (cr == 0) {
      body[body.length] = input[i];
    } else if (cr == 1) {
      tail[tail.length] = input[i];
    } else {
      head[head.length] = input[i];
    }
  }
  let sortedHead = qSort(head);
  let sortedTail = qSort(tail);
  let bodyInUse = "";
  len = body.length;
  for (let i = 0; i < len; i++) {
    bodyInUse += k + "\n";
  }
  return sortedHead + + sortedTail
}

