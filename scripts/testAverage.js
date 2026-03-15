import { makeAllSampleAverageObj } from './averageSampleObj.js'

// yoinked from chart.js
const sample_data_1 = {
  fromFile: "CDS1-S.D00",
  area: "central",
  time: "day",
  depth: "surface",
  sample_num: "2",
  bins: [
    { bin: 1, counts: 108},
    { bin: 2, counts: 1},
    { bin: 3, counts: 0},
    { bin: 4, counts: 2},
    { bin: 5, counts: 6},
    { bin: 6, counts: 12},
    { bin: 7, counts: 6},
    { bin: 8, counts: 15},
    { bin: 9, counts: 9},
    { bin: 10, counts: 5},
    { bin: 11, counts: 6},
    { bin: 12, counts: 9},
    { bin: 13, counts: 11},
    { bin: 14, counts: 4},
    { bin: 15, counts: 7},
    { bin: 16, counts: 9},
    { bin: 17, counts: 4},
    { bin: 18, counts: 4},
    { bin: 19, counts: 1},
    { bin: 20, counts: 0},
    { bin: 21, counts: 0},
    { bin: 22, counts: 0},
    { bin: 23, counts: 0},
    { bin: 24, counts: 0},
  ],
}

const sample_data_2 = {
  fromFile: "CDS2-S.D00",
  area: "central",
  time: "day",
  depth: "surface",
  sample_num: "2",
  bins: [
    { bin: 1, counts: 202},
    { bin: 2, counts: 6},
    { bin: 3, counts: 0},
    { bin: 4, counts: 2},
    { bin: 5, counts: 13},
    { bin: 6, counts: 35},
    { bin: 7, counts: 27},
    { bin: 8, counts: 24},
    { bin: 9, counts: 20},
    { bin: 10, counts: 10},
    { bin: 11, counts: 10},
    { bin: 12, counts: 15},
    { bin: 13, counts: 7},
    { bin: 14, counts: 14},
    { bin: 15, counts: 8},
    { bin: 16, counts: 5},
    { bin: 17, counts: 6},
    { bin: 18, counts: 7},
    { bin: 19, counts: 0},
    { bin: 20, counts: 1},
    { bin: 21, counts: 2},
    { bin: 22, counts: 4},
    { bin: 23, counts: 0},
    { bin: 24, counts: 0},
  ],
}


const sample_data_average = {
  fromFile: "CDS2-S.D00",
  area: "central",
  time: "day",
  depth: "surface",
  sample_num: "2",
  bins: [
    { bin: 1, counts: (202 + 108) / 2 },
    { bin: 2, counts: (6 + 1) / 2},
    { bin: 3, counts: 0},
    { bin: 4, counts: (2 + 2) / 2},
    { bin: 5, counts: (13 + 6) / 2},
    { bin: 6, counts: (35 + 12) / 2},
    { bin: 7, counts: (27 + 6)/2},
    { bin: 8, counts: (24 + 15)/2},
    { bin: 9, counts: (20 + 9)/2},
    { bin: 10, counts: (10 + 5)/2},
    { bin: 11, counts: (10 + 6)/2},
    { bin: 12, counts: (15 + 9)/2},
    { bin: 13, counts: (7 + 11)/2},
    { bin: 14, counts: (14 + 4)/2},
    { bin: 15, counts:( 8 + 7)/2},
    { bin: 16, counts:( 5 + 9)/2},
    { bin: 17, counts:( 6 + 4)/2},
    { bin: 18, counts:( 7 + 4)/2},
    { bin: 19, counts:( 0 + 1)/2},
    { bin: 20, counts: 1/2},
    { bin: 21, counts: 2/2},
    { bin: 22, counts: 4/2},
    { bin: 23, counts: 0},
    { bin: 24, counts: 0},
  ],
}




// console.log(sample_data_1);
let test_obj = {
    files: [
        sample_data_1,
        sample_data_2
    ]
}


testAverage(test_obj);

function testAverage(test_obj) {
    const average = makeAllSampleAverageObj(test_obj);
    for (let i = 0; i < average.samples.length; i++) {
        console.log(average.samples[i]);
        console.assert(average.samples[i].toString == sample_data_average.bins[i].toString, "they are not equal");
    }
    
    return;
}