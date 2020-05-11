export const isPeezda = (dice) => {
  // if there is not at least one scoring dice, Peezda, return true.
  var dieCounts = [0, 0, 0, 0, 0, 0];
  for ( var die in dice ) {
    // increment the dieCounts by the value of each dice thrown.
    dieCounts[dice[die].value - 1] ++;
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
