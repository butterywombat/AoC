const fs = require('fs');
const input2 = fs.readFileSync('input2.txt', 'utf8').split('\n');
input2.pop();

const getCounts = (boxes) => {
  const counts = boxes.reduce((counts, boxId) => {
    const boxCounts = boxId.split('').reduce((charCounts, char) => {
      charCounts[char] = (charCounts[char] || 0) + 1;
      return charCounts
    }, {});

    let hasDouble, hasTriple;
    for (let c in boxCounts) {
      const charCount = boxCounts[c];
      if (charCount === 2) hasDouble = true;
      if (charCount === 3) hasTriple = true;
    }

    if (hasDouble) counts.doubles++;
    if (hasTriple) counts.triples++;

    return counts;

  }, {doubles: 0, triples: 0});
  return counts.doubles * counts.triples;
}

// TODO refactor so baddefficient
const getOneOffCommonLetters = (boxes) => {
  for (let i = 0; i < boxes[0].length; i++) {
    const oneLessBoxes = boxes.map(box => box.slice(0,i) + box.slice(i+1));
    oneLessBoxes.sort();
    for (let j = 0; j < oneLessBoxes.length; j++) {
      const box = oneLessBoxes[j];
      if (oneLessBoxes.indexOf(box, j+1) > -1) return box;
    };
  }
};

console.log(getCounts(input2));
console.log(getOneOffCommonLetters(input2));
