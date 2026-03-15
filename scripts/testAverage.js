import { makeAllSampleAverageObj } from './averageSampleObj.js'

// from chart.js
const sample_data_1 = {
  fromFile: "CDS1-S.D00",
  area: "central",
  time: "day",
  depth: "surface",
  sample_num: "1",
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

// for test 3
const sample_data_3 = {
  fromFile: "CNS2-S.D00",
  area: "central",
  time: "night",
  depth: "surface",
  sample_num: "1",
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

const sample_data_4 = {
  fromFile: "CNS2-Sun.D00",
  area: "central",
  time: "night",
  depth: "surface",
  sample_num: "2",
  bins: [
    // should read count 502 when paired w sample3
    { bin: 1, counts: 802},
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

let test_obj = {
    files: [
        sample_data_1,
        sample_data_2
    ]
}
let test_obj2 = {
    files: [
        sample_data_2,
        sample_data_2,
        sample_data_1
    ]
}
let test_obj3 = {
    files: [
        sample_data_1,
        sample_data_2,
        sample_data_3
    ]
}

let test_obj4 = {
    files: [
        sample_data_1,
        sample_data_2,
        sample_data_3,
        sample_data_4
    ]
}

let test_obj5 = {
    files: [
        sample_data_3,
        sample_data_2,
        sample_data_1,
        sample_data_4
    ]
}
// testAverage(test_obj);
// // same result in different input order
// testAverage(test_obj2);
// 3 samples, 2 are replicates
// testAverage(test_obj3);
// 4 samples, 2 pairs of replicates
// testAverage(test_obj4);
// 4 samples, 2 pairs of replicates, out of order
testAverage(test_obj5);

function testAverage(test_obj) {
    let average = makeAllSampleAverageObj(test_obj);
    for (let i = 0; i < average.samples.length; i++) {
        console.log(average.samples[i]);
        // uncomment this to check via computer that values are as they should be
        // console.assert(average.samples[i].toString == sample_data_average.bins[i].toString, "they are not equal");
    }
    
    return;
}

function readBins(test_obj) {
  for (let i = 0; i < test_obj.files.length; i++) {
    for (let j = 0; j < test_obj.files[i].bins.length; j++) {
      console.log(test_obj.files[i].bins[j]);
    }
  }
  return;
}