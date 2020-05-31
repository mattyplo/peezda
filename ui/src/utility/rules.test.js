import { isPeezda, getNumOfAKind, getScoreOfDice, getDiceNotHeld } from './rules.js';

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

  describe('getDiceNotHeld', () => {
    // Will create a set of dice that holds a isHeld value
    // Takes in six boolean values as arguments.
    var createDice = (die1IsHeld, die2IsHeld, die3IsHeld, die4IsHeld, die5IsHeld, die6IsHeld) => {
      const dice = { 1: { isHeld: die1IsHeld },
                     2: { isHeld: die2IsHeld },
                     3: { isHeld: die3IsHeld },
                     4: { isHeld: die4IsHeld },
                     5: { isHeld: die5IsHeld },
                     6: { isHeld: die6IsHeld }
                   }
      return dice;
    }

    test('Dice 1 - 6 isHeld, should return no dice', () => {
      const dice = createDice(true, true, true, true, true, true);
      const expectedDice = {};
      expect(getDiceNotHeld(dice)).toEqual(expectedDice);
    })

    test('Dice 1, 3, 4 is held, should return just dice 2, 5, 6', () => {
      const dice = createDice(true, false, true, true, false, false);
      const expectedDice = {2: { isHeld: false },
                     5: { isHeld: false },
                     6: { isHeld: false }
                   }
      expect(getDiceNotHeld(dice)).toEqual(expectedDice);
    })

    test('Dice 6 is held, should return dice 1, 2, 3, 4, 5', () => {
      const dice = createDice(false, false, false, false, false, true);
      const expectedDice = {1: { isHeld: false },
                      2: { isHeld: false },
                      3: { isHeld: false },
                      4: { isHeld: false },
                      5: { isHeld: false }
                    }
      expect(getDiceNotHeld(dice)).toEqual(expectedDice);
    })
  })
})
