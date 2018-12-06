// const {readInput} = require('../util');
// const input5 = readInput('input5.txt');

const http = require('http')
const port = 3000

const requestHandler = (request, response) => {
  console.log(request.url)
debugger
  const res = getResultingPolymer(test);
  response.end(res)
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

const getResultingPolymer = (input) => {
  input = input.split('');
  const reactiveCombos = new Set(['aA', 'Aa', 'bB', 'Bb', 'cC', 'Cc']);
  const len = input.length;
  let i = j = 0;
  while (i < len-1) {
    let index = i-j, index2 = i+1+j
    index = index > 0 ? index : i;
    index2 = index2 < len ? index2 : i+1;
    if (reactiveCombos.has(input[index] + input[index2])) {
      input[index] = null;
      input[index2] = null;
      j++;
    }
    i++;
    debugger
  }
  return 'haha';
}

const test = 'dabAcCaCBAcCcaDA';
const testExpected = 'dabCBAcaDA';
// makeRequest(getResultingPolymer(test));
