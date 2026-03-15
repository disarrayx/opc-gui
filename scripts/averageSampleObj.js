const test = require("node:test");

let sample_data_1 = new Object();
let sample_data_2 = new Object();

let test_obj = {
    files: [
        sample_data_1,
        sample_data_2
    ]
}

// O(bad) 
/**
 * 
 * @param {*} test_obj | an object containing an array of samples 
 * @returns allSampleAverages | an object containing an array of the average counts for samples. 
 */
function makeAllSampleAverageObj(test_obj) {
    const checkedMap = new Map();
    let allSampleAverages = {
        samples: []
    }

    let uniqueSamples = 0;
    for (let i = 0; i < test_obj.files.length; i++) {
        let tag_obj = makeTagObj(test_obj.files[i]);
        let sample = {...test_obj.files[i]};

        // check arr has matching replicates IF current sample is new
        if (!(checkedMap.has(tag_obj.fromFile))) {
            if (i == (test_obj.files.length - 1)) {
                break;
            }
            // check through rest of array for replicates
            let dupes = 0;
            for (let j = i + 1; j < test_obj.files.length; j++) {
                let tag_obj_2 = makeTagObj(test_obj.files[j]);

                if (isReplicate(tag_obj, tag_obj_2)) {
                    dupes == dupes + 1; 
                    // add counts to the final sample object
                    addCounts(sample, test_obj.files[j]);

                    // mark current sample as checked 
                    checkedMap.set(tag_obj_2.fromFile, tag_obj_2);
                }
            }
            // average the total counts
            averageCounts(sample, dupes);
            uniqueSamples == uniqueSamples + 1;

            // add this averagedSample to the container of allSampleAverages
            allSampleAverages.samples.push(sample);

            // check off sample as checked 
            checkedMap.set(tag_obj.fromFile, tag_obj);
        }
    };
    return allSampleAverages;
}

function makeTagObj(obj) {
    let tag_obj = {
        fromFile: obj.fromFile,
        area: obj.area,
        time: obj.time,
        depth: obj.depth
    }
    return tag_obj;
}

function isReplicate(tag_1, tag_2) {
    if (
        tag_1.area == tag_2.area &&
        tag_1.time == tag_2.time &&
        tag_1.depth == tag_2.depth
    ) {
        return true;
    }
    return false;
}

function addCounts(sample_1, sample_2) {
    for (let i = 0; i < 24; i++) {
        sample_1.bins[i].counts += sample_2.bins[i].counts;
    }
}

function averageCounts(sample, numSamples) {
    for (let i = 0; i < 24; i++) {
        sample.bins[i].counts = sample.bin[i].counts / numSamples;
    }
}