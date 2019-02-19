
function doIt(p, d, m, s) {
  if (s < p) {
      return 0;
  }
  let afforded = Math.floor(s / p);
  let step = Math.floor((p - m) / d);
  let incase = Math.min(afforded - 1, step);
  let saved = d * pickLup(incase) + (p - m)*(afforded - incase - 1);
  let remain = s - afforded * p + saved;
  let next = Math.max(p - d * afforded, m);
  console.log({
    afforded: afforded,
    step: step,
    incase: incase,
    saved: saved,
    remain: remain,
    next: next
  });
  return afforded + doIt(next, d, m, remain);
}

function pickLup(e) {
  if (e < 1)
    return e;
  if (e % 2 == 0) {
    return (e + 1) * (e / 2);
  } else {
    return pickLup(e - 1) + e;
  }
}

console.log("cout << expected: 6 vs ", doIt(20, 3, 6, 80));
console.log("cout << expected: 7 vs ", doIt(20, 3, 6, 85));

