

/**
 * @precondition: assumes valid csv provided
 * Reference: https://www.npmjs.com/package/csv-parser
 * Usage: skeleton for createReadStream()
 */

const csv = require('csv-parser')
const fs = require('fs')
const results = [];

// todo: Take in input as csv file
fs.createReadStream('conversion/FEB1200.c00')
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', () => {
    console.log(results);
    // [
    //   { NAME: 'Daffy Duck', AGE: '24' },
    //   { NAME: 'Bugs Bunny', AGE: '22' }
    // ]
  });