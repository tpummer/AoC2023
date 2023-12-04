const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  //const fileStream = fs.createReadStream("04\\testinput.txt");
  const fileStream = fs.createReadStream("04\\input.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let games = [];

  for await (const line of rl) {
    let [cardInfo, myNumbers] = line.split(' | ');
    let [cardLabel, winningNumbers] = cardInfo.split(': ');
    winningNumbers = winningNumbers.replace(/\s+/g, ' ').trim().split(' ').map(Number);
    myNumbers = myNumbers.replace(/\s+/g, ' ').trim().split(' ').map(Number);
    games.push({ cardNumber: cardLabel.split(' ')[1], winningNumbers, myNumbers, amount: 1 });
  }

  games.forEach((game, i) => {
    for (let j = 0; j < game.amount; j++) {
      let matches = game.myNumbers.filter(number => game.winningNumbers.includes(number));
      let nextGamesToUpdate = games.slice(i + 1, i + 1 + matches.length);
      nextGamesToUpdate.forEach(nextGame => nextGame.amount += 1);
    }
  });

  let totalAmount = games.reduce((total, game) => total + game.amount, 0);

  console.log(totalAmount);
}

processLineByLine();
