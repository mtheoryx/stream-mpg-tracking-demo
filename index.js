const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const testFile = fs.readFileSync('./prior-record.csv', 'utf8');
const parsed = parse(testFile, { skip_lines_with_empty_values: true });

// Transformation time! in memory
const chopFields = parsed =>
  parsed
    .slice(1, parsed.length - 2)
    .map(x => {
      // [0] For each row, let's grab the datestring, turn it into a proper date
      // [1] For the mileage, lets make that a number (integer)
      // [2] !Then a diff of the mileage, as an int (that is calculated)
      // [3] And validate! Then a float to 3 decimal of the fuel entered
      // [4] i18n dependent Fuel cost at fillup as US Dollar, to 2 decimal places
      // [5] MPG is calculated, ignore, compute on the fly
      // [6] PM is price per mile, computed
      // [7] Perhaps nodes/geolocation entry of station
      return x;
    })
    .reduce((acc, curr) => {
      acc[curr[0]] = curr; /*?*/
      return acc;
    }, {});

const chopped = chopFields(parsed); /*?*/

console.log(chopped);

// Array.from(chopped) /*?*/

// Object.assign({}, chopped) /*?*/
