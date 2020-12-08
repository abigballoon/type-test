import { WORDS } from "./words.js";

let DEFAULT_MAX_LENGTH = 500;
let NUMBER = "1234567890";
let SYMBLE = "{}_+-=[]<>,./;':\"!@#$%^&*()";
let COMMON_SYMBLE = "_+-=,./;':\"!@%()";
let LOWER = "abcdefghijklmnopqrstuvwxyz";
let UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function createRandomText(options) {
  options = options || {};

  let result = "";
  let max_length = options.maxLength || DEFAULT_MAX_LENGTH;
  let has_equation = options.hasEquation == undefined ? true : options.hasEquation;

  let insertedNumbers = false;
  let insertNumbersAt = randint(0, max_length * 0.8);

  while (result.length < max_length) {
    let word = choice(WORDS);
    let r = Math.random();
    if (result) { result += ' '; }
    if (r > 0.9) {
      result += word;
    } else if (r > 0.8) {
      result += replaceCharacter(word, NUMBER);
    } else if (r > 0.45) {
      result += replaceCharacter(word, SYMBLE + COMMON_SYMBLE);
    } else if (r > 0.2) {
      result += replaceCharacter(word, UPPER);
    } else {
      result += replaceCharacter(word, LOWER);
    }

    if (!insertedNumbers && result.length > insertNumbersAt) {
      result += " ";
      result += `(${ equationLeft(12) }) ${ choice('+-*/') } ${ equationLeft(12) } = ${ randNum(6) }`;
      insertedNumbers = true;
    }
  }
  return result;
}

function randNum(count) {
  let result = "";
  while (result.length < count) {
    result += choice(NUMBER);
  }
  if (count > 4) {
    result = replaceCharacter(result, ",.", {range: [1, result.length - 2]});
  }
  return result;
}

function equationLeft(length) {
  let leftLength = Math.round((length - 3) / 2);
  let rightLength = length - leftLength - 3;
  return `${ randNum(leftLength) } ${ choice('+-*/') } ${ randNum(rightLength) }`
}

function randint(a, b) {
  let slice = 1 / (b - a + 1);
  let r = Math.random();
  for (let extra = 0; extra < (b - a + 1); extra++) {
    if ((extra + 1) * slice > r) {
      return (a + extra);
    }
  }
}

function choice(array) {
  let pos = randint(0, array.length - 1);
  return array[pos];
}

function replaceCharacter(word, from, options) {
  options = options || {};
  let pos;
  if (options.range) {
    pos = randint(options.range[0], options.range[1]);
  } else {
    pos = randint(0, word.length);
  }
  return word.slice(0, pos) + choice(from) + word.slice(pos + 1);
}