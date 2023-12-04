const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
 // const fileStream = fs.createReadStream("04\\testinput.txt");
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
    games.push({ cardNumber: cardLabel.split(' ')[1], winningNumbers, myNumbers });
  }

  games.forEach(game => {
    let matches = game.myNumbers.filter(number => game.winningNumbers.includes(number));
    let points = matches.length > 0 ? Math.pow(2, matches.length - 1) : 0;
    game.points = points;
  });

  let totalPoints = games.reduce((total, game) => total + game.points, 0);

  console.log(totalPoints)
}

processLineByLine();
