export function makeBlankSample(obj) {
    let copy = {
        fromFile: obj.fromFile,
        area: obj.area,
        time: obj.time,
        depth: obj.depth,
        sample_num: obj.sample_num,
        bins: [
            { bin: 1, counts: 0 },
            { bin: 2, counts: 0 },
            { bin: 3, counts: 0 },
            { bin: 4, counts: 0 },
            { bin: 5, counts: 0 },
            { bin: 6, counts: 0 },
            { bin: 7, counts: 0 },
            { bin: 8, counts: 0 },
            { bin: 9, counts: 0 },
            { bin: 10, counts: 0},
            { bin: 11, counts: 0},
            { bin: 12, counts: 0},
            { bin: 13, counts: 0},
            { bin: 14, counts: 0},
            { bin: 15, counts: 0},
            { bin: 16, counts: 0},
            { bin: 17, counts: 0},
            { bin: 18, counts: 0},
            { bin: 19, counts: 0},
            { bin: 20, counts: 0},
            { bin: 21, counts: 0},
            { bin: 22, counts: 0},
            { bin: 23, counts: 0},
            { bin: 24, counts: 0},
        ]
    }
    return copy;
}