const {readInput} = require('../util');
const input4 = readInput('input4.txt');

// helper fn. HAHAHA
const getRidiculousMapping = (inputs) => { // guardId mapped to total mins and counts of each min
  const regex = /\[(\d{4}-\d{2}-\d{2} \d{2}\:\d{2})\] (?:Guard #(\d+) begins shift|(falls asleep)|(wakes up))/;
  inputs = inputs.map(entry => {
    const parts = regex.exec(entry);
    let [match, date, guardId, sleepStart, sleepEnd] = parts;
    date = new Date(date);
    return {date, guardId, sleepStart, sleepEnd}; // sleepEnd === wakeStart
  });
  inputs.sort((a, b) => a.date - b.date);
  let lastGuardId, lastSleepStart;
  return inputs.reduce((minsAsleep, entry) => {
    const {guardId} = entry;
    if (guardId) lastGuardId = guardId;
    if (entry.sleepStart) lastSleepStart = entry.date.getMinutes();
    if (entry.sleepEnd) { // if (lastGuardId && lastSleepStart) { // should always be the case... simplify?
      const lastSleepEnd = entry.date.getMinutes();

      let minsAsleepByGuardObj = minsAsleep[lastGuardId];
      minsAsleep[lastGuardId] = minsAsleepByGuardObj || (minsAsleepByGuardObj = {counts: new Map()});
      minsAsleepByGuardObj.mins = (minsAsleepByGuardObj.mins || 0) + (lastSleepEnd - lastSleepStart);
      const {counts} = minsAsleepByGuardObj; // countsForMin
      for (let i = lastSleepStart; i < lastSleepEnd; i++) {
        counts.set(i, (counts.get(i) || 0) + 1);
      }
      lastSleepStart = null;
    }
    return minsAsleep;
  }, {});
}

// 1
const getBestGuardIdTimesMinute = (inputs) => {
  const counted = getRidiculousMapping(inputs);

  // pick the guard with most mins slept
  let pickedId;
  for (let guardId in counted) {
    const guard = counted[guardId];
    if (guard.mins >= counted[pickedId || guardId].mins) pickedId = guardId;
  }

  // pick the most common minute
  let bestCount = 0, bestMinute;
  for (let [minute, count] of counted[pickedId].counts) {
    if (count > bestCount) {
      bestCount = count;
      bestMinute = minute;
    }
  }

  return bestMinute * pickedId;
};

// 2 what am i doing with my life
const getGuardIdMostFrequentlyAsleepOnSameMinTimesMinute = (inputs) => {
  const counted = getRidiculousMapping(inputs);

  let pickedId, bestCount = 0, bestMinute;
  for (let guardId in counted) {
    const guard = counted[guardId];

    // pick the most common minute
    for (let [minute, count] of guard.counts) {
      if (count > bestCount) {
        pickedId = guardId;
        bestCount = count;
        bestMinute = minute;
      }
    }
  }

  return pickedId * bestMinute;
}
/*
#1 *
sleep start
sleep end
sleep start
sleep end
#2 *
sleep start
sleep end
*/

// const test = '[1518-11-01 00:05] falls asleep\n[1518-11-01 00:25] wakes up\n[1518-11-01 00:30] falls asleep\n[1518-11-01 00:55] wakes up\n[1518-11-01 23:58] Guard #99 begins shift\n[1518-11-02 00:40] falls asleep\n[1518-11-02 00:50] wakes up\n[1518-11-03 00:05] Guard #10 begins shift\n[1518-11-03 00:24] falls asleep\n[1518-11-03 00:29] wakes up\n[1518-11-04 00:02] Guard #99 begins shift\n[1518-11-04 00:36] falls asleep\n[1518-11-04 00:46] wakes up\n[1518-11-05 00:03] Guard #99 begins shift\n[1518-11-05 00:45] falls asleep\n[1518-11-05 00:55] wakes up\n[1518-11-01 00:00] Guard #10 begins shift';
// console.log(getBestGuardIdTimesMinute(test.split('\n')));
// console.log(getGuardIdMostFrequentlyAsleepOnSameMinTimesMinute(test.split('\n')));
console.log(getBestGuardIdTimesMinute(input4));
console.log(getGuardIdMostFrequentlyAsleepOnSameMinTimesMinute(input4));
