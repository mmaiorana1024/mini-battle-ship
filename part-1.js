const rs = require("readline-sync");

const boardSize = 3; //hardcoded playing board size of 3x3
const battleShipCount = 2; //hardcoded number of battleships to generate
const letter = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
]; //array of letters to use to generate yCoordinate

const boardLayout = new Set();
const battleShips = new Set();
const guesses = new Set();

//generates playing board based on hardcoded quantity
function boardGenerator(size) {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      boardLayout.add(letter[i] + (j + 1));
    }
  }
}

//generates battleships based on hardcoded quantity
function battleShipGenerator(numOfShips) {
  for (let i = 0; i < numOfShips; i++) {
    let newShip = randomYCoord(boardSize) + randomXCoord(boardSize);
    battleShips.add(newShip);
  }
}

//use to generate random yCoordinate each battleship will be placed at
function randomYCoord(max) {
  return letter[Math.floor(Math.random() * max)];
}

//use to generate random xCoordinate each battleship will be placed at
function randomXCoord(max) {
  return Math.floor(Math.random() * max + 1);
}

//logs players guess
function playerGuess() {
  console.log("\nEnter a location to strike ie. 'A2'");
  return rs.prompt().toUpperCase();
}

//checks if players guess is a space that exists on the board
function boardSpaceExists(space) {
  if (!boardLayout.has(space)) {
    console.log("\n     That space does not exist on the board\n");
  }
}

//checks if players guess is a hit, miss, or has already been guessed
function guessChecker(guess) {
  if (!guesses.has(guess)) {
    if (battleShips.has(guess)) {
      console.log("\n     Hit! You have sunk a battleship!");
      battleShips.delete(guess);
    } else {
      console.log("      Miss!");
    }
    guesses.add(guess);
  } else {
    console.log("\n     You have already picked this location. Miss!");
  }
}

//runs entire game
function main() {
  console.log("\n           Welcome to my Mini-Battleship Game!");
  console.log("     This is a copy of the classic game Battleship\n");

  const keyStart = rs.keyIn("           Press any key to start the game.\n");
  // clear out all Set()'s
  boardLayout.clear();
  battleShips.clear();
  guesses.clear();

  // create playing board based on board size (hardcoded)
  boardGenerator(boardSize);

  // create battleships based on hardcoded quantity
  battleShipGenerator(battleShipCount);

  // loop to make sure that battleships created are not duplicates
  // and there are the proper amount of battleships in play
  while (battleShips.size < battleShipCount) {
    battleShips.clear();
    battleShipGenerator(battleShipCount);
  }

  console.log("\nThe game board is 3x3\n");
  console.log("The available spaces to strike are:\n");
  console.log("\t    1  2  3\n\t  ----------");
  console.log(
    "\tA |  |  |  |\n\t  ----------\n\tB |  |  |  |\n\t  ----------\n\tC |  |  |  |\n\t  ----------"
  );

  // loop that tracks number of battleships still alive and ends when no battleships exist in battleShips Set()
  while (battleShips.size > 0) {
    let guess = playerGuess();
    boardSpaceExists(guess);
    guessChecker(guess);
  }

  console.log("\n\n***** CONGRATULATIONS! *****");
  console.log("You have destroyed all battle ships.\n");

  //play again query
  const playAgain = rs.keyInYN("     Would you like to play again?");
  if (playAgain) {
    main();
  } else {
    console.log("\nThank you for playing my Mini Battleship Game!\n");
  }
}

main();
