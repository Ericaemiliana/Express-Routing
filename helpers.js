/**
 * Attempt to convert an array of strings to an array of numbers
 */
function converter(numsAsStrings) {
  if (numsAsStrings === undefined || numsAsStrings.trim().length === 0) {
    throw new ExpressError("nums are required", 400);
  }
  let nums = [];

  for (let i = 0; i < stringValues.length; i++) {
    let valToNumber = Number(stringValues[i]);

    if (Number.isNaN(valToNumber)) {
      return new Error(
        `The value '${stringValues[i]}' at index ${i} is not a valid number.`
      );
    }

    nums.push(valToNumber);
  }
  return nums;
}
// find the mean

function findMean(nums) {
  if (nums.length === 0) return 0;
  return (
    nums.reduce(function (acc, cur) {
      return acc + cur;
    }) / nums.length
  );
}

function findMedian(nums) {
  // sort and get the middle element

  nums.sort((a, b) => a - b);

  let middleIndex = Math.floor(nums.length / 2);
  let median;

  if (nums.length % 2 === 0) {
    median = (nums[middleIndex] + nums[middleIndex - 1]) / 2;
  } else {
    median = nums[middleIndex];
  }
  return median;
}

/**
 * Build a frequency counter object from an array
 */
function createFrequencyCounter(arr) {
  return arr.reduce(function (acc, next) {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
  }, {});
}

/**
 * Find the most common element in the array
 */
function findMode(arr) {
  let freqCounter = createFrequencyCounter(arr);

  let count = 0;
  let mostFrequent;

  for (let key in freqCounter) {
    if (freqCounter[key] > count) {
      mostFrequent = key;
      count = freqCounter[key];
    }
  }

  return mostFrequent;
}

module.exports = {
  converter,
  findMean,
  findMedian,
  findMode,
  createFrequencyCounter,
};
