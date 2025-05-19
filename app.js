document.addEventListener('DOMContentLoaded', async () => {
  const CMS_API = 'https://data.cms.gov/provider-data/api/1/datastore/query/isrn-hqyy/0';

  const edCtx = document.getElementById('edChart').getContext('2d');
  const vaxCtx = document.getElementById('vaxChart').getContext('2d');
  const sepsisCtx = document.getElementById('sepsisChart').getContext('2d');

  function wrapLabel(text, maxLen = 40) {
    const words = text.split(' ');
    let line = '';
    let lines = [];

    for (let word of words) {
      if ((line + word).length <= maxLen) {
        line += word + ' ';
      } else {
        lines.push(line.trim());
        line = word + ' ';
      }
    }
    if (line) lines.push(line.trim());
    return lines.join('\n');
  }

  async function fetchCMSData() {
    const res = await fetch(CMS_API);
    const data = await res.json();
    return data.results;
  }

  function groupByCondition(data, condition) {
    return data.filter(m => m._condition === condition);
  }

  function renderChart(ctx, data, baseColor) {
    const hoverColorMap = {
      "#1565c0": "#0d47a1", // Blue → Darker Blue
      "#c62828": "#b71c1c", // Red → Rich Red
      "#6a1b9a": "#4a148c"  // Purple → Darker Purple
    };

    const labels = data.map(m => {
      const words = m.measure_name.split(' ');
      return words.slice(0, 16).join(' ') + '...'; // adjust 12 if needed
    });
    const scores = data.map(m => parseFloat(m.score));

    return new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'CMS Score',
          data: scores,
          backgroundColor: baseColor,
          hoverBackgroundColor: hoverColorMap[baseColor] || "#424242"
        }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { left: 240, right: 30, top: 10, bottom: 10 }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#1a237e',
              font: { weight: 'bold', size: 14 }
            }
          },
          tooltip: {
            callbacks: {
              title: (context) => data[context[0].dataIndex].measure_name,
              afterLabel: (context) => {
                const item = data[context.dataIndex];
                return [`Start Date: ${item.start_date}`, `End Date: ${item.end_date}`];
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Score',
              color: '#1a237e',
              font: { size: 14, weight: 'bold' }
            }
          },
          y: {
            ticks: {
              autoSkip: false,
              font: { size: 11, family: 'Arial' }
            }
          }
        }
      }
    });
  }

  const allData = await fetchCMSData();

  const emergencyMetrics = groupByCondition(allData, "Emergency Department")
    .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
    .slice(0, 9);

  const vaccinationMetrics = groupByCondition(allData, "Healthcare Personnel Vaccination");

  const sepsisMetrics = groupByCondition(allData, "Sepsis Care")
    .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
    .slice(0, 9);

  renderChart(edCtx, emergencyMetrics, "#1565c0"); // Blue
  renderChart(vaxCtx, vaccinationMetrics, "#c62828"); // Red
  renderChart(sepsisCtx, sepsisMetrics, "#6a1b9a"); // Purple
});
