function parseCSV(csv) {
  const lines = csv.split(/\r?\n/);
  const blocks = []

  let binRanges = [];
  let headerIndex = -1;
  let binCount = 0;
  let fromFile = "";
  let results = [];
  // Extract bin ranges

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    if (line.startsWith("FROM FILE")) {
      fromFile = line.split(',')[2].trim();
    }

    const match = line.match(/BIN\s+\d+\s+RANGE:,,([^,]+)/);
    if (match) {
      binCount++;
      if (binCount > 3) {
        binRanges.push(match[1].trim());
      }
    }

    if (line.startsWith("TIME (s)")) {
      headerIndex = i
      console.log(headerIndex)
      const headers = lines[headerIndex].split(",");
      const binStartIndex = headers.indexOf("BINS") + 3;
      results = [];

      for (let j = headerIndex + 1; j < lines.length; j++) {
        const cols = lines[j].trim().split(",");

        if (cols[0] === '') {
          break;
        }

        const bins = binRanges.map((range, k ) => ({
          range,
          count : Number(cols[binStartIndex + k] || 0)
        }))

        results.push({
          time: Number(cols[0]),
          la: Number(cols[1]),
          counts: Number(cols[2]),
          biomass: Number(cols[3]),
          depth: Number(cols[4]),
          flow: Number(cols[5]),
          fluor: Number(cols[6]),
          gps: cols[7] || null,
        bins
        })
      }
      console.log(results)
      blocks.push({fromFile: fromFile, data: results});
      //skip the next 2 rows
      i = headerIndex + 2;

      binRanges = [];
      binCount = 0;
      fromFile = "";
      headerIndex = -1;

    }
  }

  return blocks
}
const fs = require("fs");
const csvText = fs.readFileSync("sheet32.csv", "utf8");
const parsed = parseCSV(csvText);
console.log(JSON.stringify(parsed, null, 2));