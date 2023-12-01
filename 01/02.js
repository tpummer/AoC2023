const { spawn } = require('child_process');
const fs = require('fs');
const { format } = require('path');
const { nextTick } = require('process');
const readline = require('readline');

const writtenNumbers = [ 'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine' ];
const numbersAsChars = [ '0', '1', '2', '3', '4', '5', '6', '7', '8', '9' ];

async function processLineByLine() {
  const fileStream = fs.createReadStream('01\\input.txt');
  //const fileStream = fs.createReadStream('01\\testinput2.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let combinedValues = 0;
  for await (const line of rl) {
    // for each line get the first and last number and make a new number out of it by concatenating them
    let indeces = {}
    // get the index of every character that is a number
    for (let i = 0; i < line.length; i++) {
      let char = line[i];
      if (!isNaN(char)) {
        indeces[i] = char;
      }
    }

    // iterate over every substring to check if it starts with a written number
    for (let i = 0; i < line.length; i++) {
      let char = line[i];
      if (numbersAsChars.includes(char)) {
        continue;
      }

      for (let j = 0; j < writtenNumbers.length; j++) {
        let writtenNumber = writtenNumbers[j];
        if (line.startsWith(writtenNumber, i)) {
          indeces[i] = numbersAsChars[j];
        }
      }
    }

    //sort indeces
    let indecesSorted = Object.keys(indeces).sort((a, b) => a - b);

    // get first and last digit
    let first = indeces[indecesSorted[0]];

    let last = indeces[indecesSorted[indecesSorted.length-1]];

    // make new number
    let newNumber = first + last;

    console.log(line);
    console.log(indeces);
    console.log(newNumber);
    

    // add to combinedValues
    combinedValues += parseInt(newNumber);
    console.log(combinedValues)
    console.log('---')
  }
  

  console.log(`Result: ${combinedValues}`);

}




processLineByLine();
