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

// ry
const solve = (input) => {
  // loop through each word
  for (let i = 0; i < input.length; i++) {
    let word = input[i]
    // compare it to every other word
    for (let j = 0; j < input.length; j++) {
      if (j === i) continue
      let otherWord = input[j]
      let mismatchCount = 0 //reset count for every word
      let commonLetters = ''
      // compare letters of both words
      for (let k = 0; k < word.length; k++) {
        if (word[k] === otherWord[k]) {
          commonLetters += word[k]
        } else {
          mismatchCount++
        }
      }

      if (mismatchCount === 1) return commonLetters
    }
  }
}

// console.log(getCounts(input2));
console.log(getOneOffCommonLetters(input2));
console.log(solve(input2));
