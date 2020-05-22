export const selectDiceToHold = (dice) => {

  var diceUnderConsideration = {}
  var numOfAKind = [0, 0, 0, 0, 0, 0];

  for (var die in dice ) {
    // if dice is not already held
    //console.log(die)
    if(!dice[die].isHeld) {
        diceUnderConsideration[die] = dice[die]
        // increment numOfAKind
        numOfAKind[dice[die].value - 1] ++
    }
  }

  // Find all scoring dice
  // if numOfAKing 2, 3, 4 or 6 is greater then 3, hold those dice.
  var diceToHold = {}
  for (var die in diceUnderConsideration) {
    const currentDieValue = diceUnderConsideration[die].value
    if (currentDieValue === 1 || currentDieValue === 5 || numOfAKind[currentDieValue - 1] > 2) {
      diceToHold[die] = diceUnderConsideration[die]
    }
  }
  // return scoring dice as dice to hold.
  return diceToHold
}
