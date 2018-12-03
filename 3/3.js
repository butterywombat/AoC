const {readInput} = require('../util');
const input3 = readInput('input3.txt');

// 1
const squareInchesOfOverlap = (inputs) => {
  const regEx = /.+ @ (\d+),(\d+)\: (\d+)x(\d+)/;
  let counts = 0;
  inputs.reduce((seenMatrix, claim) => {
    const parts = regEx.exec(claim);
    // #1 @ 1,3: 4x4. 1col: 1, 2row: 3, 3colspan: 4, 4rowspan: 4 matching
    const col = +parts[1], row = +parts[2], colspan = +parts[3], rowspan = +parts[4];
    for (let i = row; i < row + rowspan; i++) {
      if (!seenMatrix[i]) seenMatrix[i] = {};
      for (let j = col; j < col + colspan; j++) {
        const seenBefore = seenMatrix[i][j];
        if (seenBefore === 1) counts++; // seen once before
        seenMatrix[i][j] = seenBefore ? 2 : 1; // more than once, put a 2 there
      }
    }
    return seenMatrix;
  }, {});
  return counts;
};

// 2
const test = "#1 @ 1,3: 4x4\n#2 @ 3,1: 4x4\n#3 @ 5,5: 2x2".split('\n');

const nonOverlappedClaim = (inputs) => {
  const regEx = /#(\d+) @ (\d+),(\d+)\: (\d+)x(\d+)/;
  let badIds = new Set(), goodIds = new Set();
  let seenMatrix = {};
  inputs.forEach(claim => {
    const parts = regEx.exec(claim);
    const claimId = +parts[1], col = +parts[2], row = +parts[3], colspan = +parts[4], rowspan = +parts[5];
    for (let i = row; i < row + rowspan; i++) {
      if (!seenMatrix[i]) seenMatrix[i] = {};
      for (let j = col; j < col + colspan; j++) {
        const seenBeforeId = seenMatrix[i][j];
        if (seenBeforeId) {
          badIds.add(seenBeforeId);
          badIds.add(claimId);
          goodIds.delete(seenBeforeId);
          goodIds.delete(claimId);
        } else if (!badIds.has(claimId)) {
          goodIds.add(claimId);
        }

        seenMatrix[i][j] = claimId;
      }
    }
  });
  return goodIds;
};

console.log(squareInchesOfOverlap(input3));
console.log(nonOverlappedClaim(input3));
// console.log(nonOverlappedClaim(test));
