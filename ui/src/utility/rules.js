export const isPeezda = (dice) => {
  // if there is not at least one scoring dice, Peezda, return true.
  var dieCounts = [0, 0, 0, 0, 0, 0];
  for ( var die in dice ) {
    // only dice not being held are considered.
    if (!dice[die].isHeld) {
      // increment the dieCounts by the value of each dice thrown.
      dieCounts[dice[die].value - 1] ++;
    }
  }

  // return false
  // if the value of dieCounts[0] is greater than 0
  // if the value of dieCounts[4] is greater than 0
  // if the value of any index in dieCounts is greater then 2
  if ( dieCounts[0] > 0 || dieCounts[1] > 2 || dieCounts[2] > 2
    || dieCounts[3] > 2 || dieCounts[4] > 0 || dieCounts[5] > 2) {
      return false;
  }
  // else, we have a Peezda, return true.
  return true;
}

export const getDiceNotHeld = (dice) => {
  var diceNotHeld = {};
  for (var die in dice) {
    if (!dice[die].isHeld && !dice[die].markedToHold) {
      diceNotHeld[die] = dice[die];
    }
  }
  return diceNotHeld;
}

export const getNumOfAKind = (dice) => {
  var numOfAKind = [0, 0, 0, 0, 0, 0];
  for (var die in dice ) {
    numOfAKind[dice[die].value - 1] ++
  }
  return numOfAKind;
}

export const calculateNextPlayersTurn = (currentPlayersTurn, numPlayers) => {
  const currentPlayersTurnInteger = Number(currentPlayersTurn);
  var newTurn;
  if (currentPlayersTurnInteger === numPlayers) {
    newTurn = 1;
  } else {
    newTurn = currentPlayersTurnInteger + 1;
  }
  return newTurn.toString();
}

export const getScoreOfDice = (dice) => {
  const numOfAKind = getNumOfAKind(dice);
  var score = 0;
  // tally score for each value of dice
  for(var i = 0; i < numOfAKind.length; i++){
    switch (numOfAKind[i]) {
      case 1:
        // 0 is the first value on a die, which is 1
        if (i === 0) {
          score += 100;
        // 4 is the fifth value on a die, which is 5
        } else if (i === 4) {
          score += 50;
        } // else any other value of 1 of a kind is nothing
        break;
      case 2:
        // 0 is the first value on a die, which is 1
        if (i === 0) {
          score += 200;
        // 4 is the fifth value on a die, which is 5
        } else if (i === 4) {
          score += 100;
        } // else any other value of 1 of a kind is nothing
        break;
      case 3:
        if (i === 0) {
          score += 1000;
        } else {
          score += (i + 1) * 100;
        }
        break;
      case 4:
        if (i === 0) {
          score += 2000;
        } else {
          score += (i + 1) * 200;
        }
        break;
      case 5:
        if (i === 0) {
          score += 4000;
        } else {
          score += (i + 1) * 400;
        }
        break;
      case 6:
        if (i === 0) {
          score += 8000;
        } else {
          score += (i + 1) * 800;
        }
        break;
      // default is 0
      default:
        break;
    }
  }
  return score;
}

export const isScoringDiceHeld = (dice) => {
  var numOfAKind = [0, 0, 0, 0, 0, 0];
  for (var die in dice ) {
    // if dice is not already held
    if(dice[die].markedToHold) {
        numOfAKind[dice[die].value - 1] ++
    }
  }

  // if at least a one, five, or three of a kind of another side return true;
  if (numOfAKind[0] > 0 || numOfAKind[1] > 2 ||
      numOfAKind[2] > 2 || numOfAKind[3] > 2 ||
      numOfAKind[4] > 0 || numOfAKind[5] > 2) {
        return true;
    }
  // no scoring dice, return false
  return false;
}
