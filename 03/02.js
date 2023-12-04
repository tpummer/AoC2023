const fs = require("fs");
const readline = require("readline");

async function processLineByLine() {
  //const fileStream = fs.createReadStream("03\\testinput.txt");
  const fileStream = fs.createReadStream("03\\input.txt");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let grid = [];
  for await (const line of rl) {
    grid.push(line.split(""));
  }

  let numbers = [];
  for (let i = 0; i < grid.length; i++) {
    let line = grid[i];
    let number = "";
    let coords = [];
    for (let j = 0; j < line.length; j++) {
      let char = line[j];
      if (!isNaN(char)) {
        number += char;
        coords.push({ digit: char, x: j, y: i });
      } else {
        if (number !== "") {
          numbers.push({ number, coords });
          number = "";
          coords = [];
        }
      }
    }
    if (number !== "") {
      numbers.push({ number, coords });
    }
  }

  let sum = 0;
  let star = /[*]/;
  //now check for each number in numbers any of it coordinates has a neighbor that is a star, diagnolly also counts
  //if true, store the coordinates of the star and add an array that can hold it's neighboring numbers
  //if coordnates of the the star was already stored, add the number to the array
  let stars = new Map();

  for (let { number, coords } of numbers) {
    let hasNeighbor = false;
    for (let { x, y } of coords) {
      for (let dx = -1; dx <= 1 && !hasNeighbor; dx++) {
        for (let dy = -1; dy <= 1 && !hasNeighbor; dy++) {
          let nx = x + dx;
          let ny = y + dy;
          if (nx >= 0 && nx < grid[0].length && ny >= 0 && ny < grid.length && grid[ny][nx] === '*') {
            let key = `${nx},${ny}`;
            if (!stars.has(key)) {
              stars.set(key, []);
              stars.get(key).push(number);
            } else {
              stars.get(key).push(number);
            }
            // next number
            hasNeighbor = true;
          }
        }
      }
    }
  }
  console.log(stars)

  // get all stars that have exactly 2 numbers
  let twoStars = [...stars.entries()].filter(([key, value]) => value.length === 2);
  //calculate their product and add it up
  for (let [key, value] of twoStars) {
    let [a, b] = value;
    let product = a * b;
    sum += product;
  }

  console.log(sum)
}

processLineByLine();
