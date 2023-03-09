const rs = require('readline-sync');

const boardSize = 3;
const battleShipCount = 2;

const letter = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];


const boardLayout = new Set();

function boardGenerator(size){
  for (let i=0; i<size; i++){
    boardLayout.add(letter[i]+'0');
    boardLayout.add(letter[i]+'1');
    boardLayout.add(letter[i]+'2');
  }
}

boardGenerator(boardSize);
console.log(boardLayout);


class BattleShip {
  constructor(name,xCoord, yCoord, location){
    this.name = name;
    this.yCoord = yCoord;
    this.xCoord = xCoord;
    this.location = yCoord+xCoord;
  }
}

function randomYCoord(max){
 return letter[Math.floor(Math.random() * max)]
}
function randomXCoord(max) {
  return Math.floor(Math.random() * max);
}

const battleShips = new Map();

function battleShipGenerator(numOfShips){
 for (let i=0; i<numOfShips; i++){
  let newShip = new BattleShip(`battleship${[i]}`, randomXCoord(boardSize), randomYCoord(boardSize));
  battleShips.set(newShip.name,newShip.location);
 }

}
battleShipGenerator(battleShipCount);
// console.log(battleShips);
