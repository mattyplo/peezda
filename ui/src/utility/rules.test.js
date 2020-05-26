import { isPeezda, getNumOfAKind, getScoreOfDice } from './rules.js';

describe('rules - isPeezda', () => {

  const createDice = (dieVal1, dieVal2, dieVal3, dieVal4, dieVal5, dieVal6) => {
    const dice = { 1: { value: dieVal1 },
                   2: { value: dieVal2 },
                   3: { value: dieVal3 },
                   4: { value: dieVal4 },
                   5: { value: dieVal5 },
                   6: { value: dieVal6 }
                 }
    return dice;
  }

  test('no ones, no fives, and no three of a kinds returns true', () => {
    const dice = createDice(2, 3, 4, 2, 3, 4);
    expect(isPeezda(dice)).toBe(true);
  })

  test('one one, no fives, no three of a kinds returns false', () => {
    const dice = createDice(1, 2, 3, 4, 6, 6);
    expect(isPeezda(dice)).toBe(false);
  })

  test('no ones, no fives, a three of a kind returns false', () => {
    const dice = createDice(4, 2, 3, 4, 2, 2);
    expect(isPeezda(dice)).toBe(false);
  })

  test('a single 5 returns false', () => {
    const dice = createDice(5);
    expect(isPeezda(dice)).toBe(false);
  })
})

describe('rules - getNumOfAKind', () => {
  const createDice = (dieVal1, dieVal2, dieVal3, dieVal4, dieVal5, dieVal6) => {
    const diceVals = [dieVal1, dieVal2, dieVal3, dieVal4, dieVal5, dieVal6]
    var dice = {};
    for (var i = 0; i < diceVals.length; i++) {
      if (diceVals[i] !== 0) {
        dice[i + 1] = { value: diceVals[i]}
      }
    }
    return dice;
  }

  test('3 fives, a one and a two should return [1, 1, 0, 0, 3, 0]', () => {
    const dice = createDice(1, 2, 5, 5, 0, 5);
    expect(getNumOfAKind(dice)).toEqual([1, 1, 0, 0, 3, 0]);
  })

  test('4 fours, and two fives should return [0, 0, 0, 4, 2, 0]', () => {
    const dice = createDice(4, 4, 5, 4, 5, 4);
    expect(getNumOfAKind(dice)).toEqual([0, 0, 0, 4, 2, 0]);
  })
})

describe('rules - getScoreOfDice', () => {
  const createDice = (dieVal1, dieVal2, dieVal3, dieVal4, dieVal5, dieVal6) => {
    const diceVals = [dieVal1, dieVal2, dieVal3, dieVal4, dieVal5, dieVal6]
    var dice = {};
    for (var i = 0; i < diceVals.length; i++) {
      if (diceVals[i] !== 0) {
        dice[i + 1] = { value: diceVals[i]}
      }
    }
    return dice;
  }

  test('6 ones should return 8000', () => {
    const dice = createDice(1, 1, 1, 1, 1, 1);
    expect(getScoreOfDice(dice)).toEqual(8000);
  })

  test('3 ones and 3 twos should return 1200', () => {
    const dice = createDice(2, 1, 2, 1, 1, 2);
    expect(getScoreOfDice(dice)).toEqual(1200);
  })

  test('1 one, 1 two, 1 three, 1 four, 1 five, 1 six should return 150', () => {
    const dice = createDice(1, 2, 3, 4, 5, 6);
    expect(getScoreOfDice(dice)).toEqual(150);
  })
})
