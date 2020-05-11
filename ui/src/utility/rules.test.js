import { isPeezda } from './rules.js';

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
