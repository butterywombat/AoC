const fs = require('fs');
const fuckthis = fs.readFileSync('input1.txt', 'utf8').split('\n').map(n => +n);
fuckthis.pop();
const getFrequency = (i) => {
  return i.reduce((sum, n) => sum + n);
}

const twiceFreq = (inputs) => {
  let sumSoFar = 0;
  let seen = {0: 1};
  while (true) {
    for (let i = 0; i < inputs.length; i++) {
      sumSoFar += inputs[i];
      if (seen[sumSoFar]) return sumSoFar;
      seen[sumSoFar] = 1;
    };
  }
};

// console.log(getFrequency(input1));
console.log(twiceFreq(fuckthis));
