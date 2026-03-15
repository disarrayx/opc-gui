
/**
 * 
 * @param {*} test_obj | an object containing an array of samples 
 * @returns allSampleAverages | an object containing an array of the average counts for samples. 
 *          allSampleAverages = { samples: [ {}, {}, {} ] }
 */
export function makeAllSampleAverageObj(test_obj) {
    const checkedMap = new Map();
    let allSampleAverages = {
        samples: []
    }

    let uniqueSamples = 0;
    for (let i = 0; i < test_obj.files.length; i++) {
        let tag_obj = makeTagObj(test_obj.files[i]);
        let sample = makeCopy(test_obj.files[i]);

        // check arr has matching replicates IF current sample is new
        if (!(checkedMap.has(tag_obj.fromFile))) {
            // always 1 dupe (original)
            let dupes = 1;
            for (let j = i + 1; j < test_obj.files.length; j++) {
                let tag_obj_2 = makeTagObj(test_obj.files[j]);

                if (isReplicate(tag_obj, tag_obj_2)) {
                    dupes = dupes + 1; 
                    
                    // add counts to the final sample object
                    addCounts(sample, test_obj.files[j]);

                    // mark current sample as checked 
                    checkedMap.set(tag_obj_2.fromFile, tag_obj_2);
                }
            }
            // average the total counts
            averageCounts(sample, dupes);
            uniqueSamples = uniqueSamples + 1;
            sample.sample_num = uniqueSamples;

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

export function addCounts(sample_1, sample_2) {
    for (let i = 0; i < 24; i++) {
        sample_1.bins[i].counts += sample_2.bins[i].counts;
    }
}

function averageCounts(sample, numSamples) {
    for (let i = 0; i < 24; i++) {
        if (sample.bins[i].counts !== 0) {
            sample.bins[i].counts = sample.bins[i].counts / numSamples;
        }
    }
}

function makeCopy(obj) {
    let copy = {
        fromFile: obj.fromFile,
        area: obj.area,
        time: obj.time,
        depth: obj.depth,
        sample_num: "0",
        bins: [
            { bin: 1, counts: obj.bins[1 - 1].counts},
            { bin: 2, counts: obj.bins[2 - 1].counts},
            { bin: 3, counts: obj.bins[3 - 1].counts},
            { bin: 4, counts: obj.bins[4 - 1].counts},
            { bin: 5, counts: obj.bins[5 - 1].counts},
            { bin: 6, counts: obj.bins[6 - 1].counts},
            { bin: 7, counts: obj.bins[7 - 1].counts},
            { bin: 8, counts: obj.bins[8 - 1].counts},
            { bin: 9, counts: obj.bins[9 - 1].counts},
            { bin: 10, counts: obj.bins[10 - 1].counts},
            { bin: 11, counts: obj.bins[11 - 1].counts},
            { bin: 12, counts: obj.bins[12 - 1].counts},
            { bin: 13, counts: obj.bins[13 - 1].counts},
            { bin: 14, counts: obj.bins[14 - 1].counts},
            { bin: 15, counts: obj.bins[15 - 1].counts},
            { bin: 16, counts: obj.bins[16 - 1].counts},
            { bin: 17, counts: obj.bins[17 - 1].counts},
            { bin: 18, counts: obj.bins[18 - 1].counts},
            { bin: 19, counts: obj.bins[19 - 1].counts},
            { bin: 20, counts: obj.bins[20 - 1].counts},
            { bin: 21, counts: obj.bins[21 - 1].counts},
            { bin: 22, counts: obj.bins[22 - 1].counts},
            { bin: 23, counts: obj.bins[23 - 1].counts},
            { bin: 24, counts: obj.bins[24 - 1].counts},
        ]
    }
    return copy;
}