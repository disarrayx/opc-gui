let chartInstance = null;

export function renderChart(dataArray) {

  if (!dataArray || dataArray.length === 0) {
    console.error("No data to render");
    return;
  }

  const ctx = document.getElementById("myChart");

  const labels = Array.from({ length: 24 }, (_, i) => `Bin ${i + 1}`);

  const datasets = dataArray.map(sample => ({
    label: sample.fromFile || "Sample",
    data: sample.bins.map(b => b.counts),
    borderWidth: 1
  }));

  if (chartInstance) chartInstance.destroy();

  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: datasets
    },
    options: {
      responsive: true,
      scales: {
        y: {
          title: {
            display: true,
            text: "Abundance"
          }
        }
      }
    }
  });

}