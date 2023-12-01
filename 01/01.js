const { spawn } = require('child_process');
const fs = require('fs');
const { format } = require('path');
const { nextTick } = require('process');
const readline = require('readline');

async function processLineByLine() {
  const fileStream = fs.createReadStream('01\\input.txt');
  //const fileStream = fs.createReadStream('01\\testinput.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

let combinedValues = 0;
  for await (const line of rl) {
    // for each line get the first and last number and make a new number out of it by concatenating them

    // split string into each character and filter it for just numbers
    let digits = line.split('').filter(char => !isNaN(char));
    //get first and last digit
    let first = digits[0];
    let last = digits[digits.length-1];


    // make new number
    let newNumber = first + last;

    console.log(newNumber);

    // add to combinedValues
    combinedValues += parseInt(newNumber);
  }
  

  console.log(`Result: ${combinedValues}`);

}

processLineByLine();