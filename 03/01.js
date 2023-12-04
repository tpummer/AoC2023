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
          console.log(number);
          console.log(coords);
          numbers.push({ number, coords });
          number = "";
          coords = [];
        }
      }
    }
    if (number !== "") {
      console.log(number);
      console.log(coords);
      numbers.push({ number, coords });
    }
  }

  let sum = 0;
  let nonDigitDot = /[^0-9.]/;
  //now check for each number in numbers any of it coordinates has a neighbor that isn't a nonDigitDot
  //if any of that is true, add the number to sum
  for (let i = 0; i < numbers.length; i++) {
    let number = numbers[i];
    let coords = number.coords;
    let hasNeighbor = false;
    for (let j = 0; j < coords.length; j++) {
      let coord = coords[j];
      let x = coord.x;
      let y = coord.y;
      if (x > 0) {
        if (nonDigitDot.test(grid[y][x - 1])) {
          console.log(grid[y][x - 1])
          hasNeighbor = true;
        }
      }
      if (x < grid[y].length - 1) {
        if (nonDigitDot.test(grid[y][x + 1])) {
          console.log(grid[y][x + 1])
          hasNeighbor = true;
        }
      }
      if (y > 0) {
        if (nonDigitDot.test(grid[y - 1][x])) {
          console.log(grid[y - 1][x])
          hasNeighbor = true;
        }
      }
      if (y < grid.length - 1) {
        if (nonDigitDot.test(grid[y + 1][x])) {
          console.log(grid[y + 1][x])
          hasNeighbor = true;
        }
      }
      //add the diagonal neighbours
      if (x > 0 && y > 0) {
        if (nonDigitDot.test(grid[y - 1][x - 1])) {
          console.log(grid[y - 1][x - 1])
          hasNeighbor = true;
        }
      }
      if (x > 0 && y < grid.length - 1) {
        if (nonDigitDot.test(grid[y + 1][x - 1])) {
          console.log(grid[y + 1][x - 1])
          hasNeighbor = true;
        }
      }
      if (x < grid[y].length - 1 && y > 0) {
        if (nonDigitDot.test(grid[y - 1][x + 1])) {
          console.log(grid[y - 1][x + 1])
          hasNeighbor = true;
        }
      }
      if (x < grid[y].length - 1 && y < grid.length - 1) {
        if (nonDigitDot.test(grid[y + 1][x + 1])) {
          console.log(grid[y + 1][x + 1])
          hasNeighbor = true;
        }
      }
    }
    if (hasNeighbor) {
      sum += parseInt(number.number);
    } else {
      console.log(`Number ${number.number} has no neighbors`);
    }
  }
  console.log(sum)
}

processLineByLine();
