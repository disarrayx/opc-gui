// scripts/chart.js

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

document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById("myChart");

  //const labels = sample_data_1.bins.map(bin => `Bin ${bin.bin}`);
  const dataValues_1 = sample_data_1.bins.map(bin => bin.counts);
  const dataValues_2 = sample_data_2.bins.map(bin => bin.counts);
  const data = {
    labels: ["Bin 1", "Bin 2", "Bin 3", "Bin 4", "Bin 5", "Bin 6", "Bin 7", "Bin 8", "Bin 9", "Bin 10", "Bin 11", "Bin 12", "Bin 13", "Bin 14", "Bin 15", "Bin 16", "Bin 17", "Bin 18", "Bin 19", "Bin 20", "Bin 21", "Bin 22", "Bin 23", "Bin 24"],
    datasets: [
      {
        label: sample_data_1.fromFile,
        data: dataValues_1,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      },
      {
        label: sample_data_2.fromFile,
        data: dataValues_2,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Chart.js Bar Chart Stacked'
        },
      },
      responsive: true,
      interaction: {
        intersect: false,
      },
      scales: {
        x: {
          stacked: false,
        },
        y: {
          stacked: false,
          title: {
            display: true,
            text: 'Abundance'
          }
        }
      }
    }
  };

    new Chart(ctx, config);
});