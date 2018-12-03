const fs = require('fs');
module.exports = {
  readInput: file => {
    const f = fs.readFileSync(file, 'utf8').split('\n');
    f.pop();
    return f;
  }
}


