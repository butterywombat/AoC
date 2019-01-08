const {readInput} = require('../util');
let input5 = readInput('input5.txt');

const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
  console.log(request.url)

  input5 = input5[0];
  const res = `A: ${getResultingPolymerLen(input5)}\nB: ${getBestResultingPolymerLenIfRemove(input5)}`
  response.end(res);
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

const isReactive = (c1, c2) => {
  if (typeof c1 !== 'string' || typeof c2 !== 'string') return;
  if (c1.toLowerCase() === c2.toLowerCase() && (c1.toUpperCase() === c1 && c2.toLowerCase() === c2 || c1.toLowerCase() === c1 && c2.toUpperCase() === c2)) return true;
}

const getBestResultingPolymerLenIfRemove = (input) => {
  const defaultBest = input.length;
  return 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((best, char) => {
    let len = getResultingPolymerLen(input.replace(new RegExp(char, 'gi'), ''));
    return len < best ? len : best;
  }, defaultBest);
}

const getResultingPolymerLen = (input) => {
  input = input.split('');
  const len = input.length;
  let i = 0, j = 1;
  let lastIterWasMatch = false;
  while (i < len && j < len) {
    while (isReactive(input[i], input[j])) {
      input[i] = null;
      input[j] = null;

      // TODO keep track of the last i of char searching backwards instead of this while loop. would cover the if case too...
      // or probably just splice, jeez
      // i = indexOfLastCharSearchingBackwards;

      while (typeof input[i] !== 'string' && i > -1) i--;
      if (i === 0 && typeof input[0] !== 'string') {
        i = j;
      }

      j++;
      lastIterWasMatch = true; // went into this loop
    }
    if (lastIterWasMatch) {
      i = j;
      j = i+1;
    } else {
      i++; j++;
    }
    lastIterWasMatch = false;
  }
  return input.filter(c => typeof c !== 'undefined').join('').length;
}

const test = 'dabAcCaCBAcCcaDA';
const testExpected = 'dabCBAcaDA';
