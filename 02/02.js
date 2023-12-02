const { spawn } = require('child_process');
const { log } = require('console');
const fs = require('fs');
const { format } = require('path');
const { nextTick } = require('process');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('02\\input.txt');
  //const fileStream = fs.createReadStream('02\\testinput.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  //dictionary of cubecolors and their amount
  let cubeColorsLimit = {'green': 13, 'red' : 12, 'blue': 14 };

let sumOfPowers = 0;
  for await (const line of rl) {
    // an example line looks like this:
    // Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green

    // read game id, which is the first number
    let gameId = parseInt(line.split(':')[0].split(' ')[1]);
    let amounts = {};   

    // split into cube amounts, which are separated by ';' or ','
    let splittetIntoGames = line.split(':')[1].split(';');
    let cubeAmounts = [];
    splittetIntoGames.forEach(game => {game.split(',').forEach(cubeAmount => cubeAmounts.push(cubeAmount))});

    for (let i = 0; i < cubeAmounts.length; i++) {
      let cubeAmount = cubeAmounts[i];
      // split into color and amount
      let color = cubeAmount.split(' ')[2];
      let amount = parseInt(cubeAmount.split(' ')[1]);
      // only add to the amout if the amout is higher than the already stored one or if it is not stored yet
      if (amounts[color] == undefined || amount > amounts[color]) {
        console.log(`Adding ${amount} ${color} cubes to game ${gameId}`);
        amounts[color] = amount;
      } else {
        console.log(`Not adding ${amount} ${color} cubes to game ${gameId}`);
      }
    }

    console.log(amounts)

    // multiply the amounts
    let power = 1;
    for (let color in amounts) {
      power *= amounts[color];
    }
    log(`Power of game ${gameId}: ${power}`);
    sumOfPowers += power;
  }
  

  console.log(`Result: ${sumOfPowers}`);

}

processLineByLine();