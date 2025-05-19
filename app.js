document.addEventListener('DOMContentLoaded', async () => {
    const CMS_API = 'https://data.cms.gov/provider-data/api/1/datastore/query/isrn-hqyy/0';
  
    const edCtx = document.getElementById('edChart').getContext('2d');
    const vaxCtx = document.getElementById('vaxChart').getContext('2d');
    const sepsisCtx = document.getElementById('sepsisChart').getContext('2d');
  
    let edChart, vaxChart, sepsisChart;
  
    // Helper: Wrap long labels at word boundaries
    function wrapLabel(text, maxLen = 50) {
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
  
    function renderChart(ctx, data, color) {
        const labels = data.map(m => {
          const words = m.measure_name.split(' ');
          return words.slice(0, 10).join(' ') + '...'; // Truncate label
        });
      
        const scores = data.map(m => parseFloat(m.score));
      
        return new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Score', // ✅ Keep this
              data: scores,
              backgroundColor: color
            }]
          },
          options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            layout: {
              padding: {
                left: 200
              }
            },
            plugins: {
              legend: { display: true },
              tooltip: {
                callbacks: {
                  title: (context) => data[context[0].dataIndex].measure_name,
                  afterLabel: (context) => {
                    const item = data[context.dataIndex];
                    return [
                      `Start: ${item.start_date}`,
                      `End: ${item.end_date}`
                    ];
                  }
                }
              }
            },
            scales: {
              x: {
                beginAtZero: true
              },
              y: {
                ticks: {
                  autoSkip: false,
                  font: {
                    size: 12
                  }
                }
              }
            }
          }
        });
    }            
  
    const allData = await fetchCMSData();
  
    const emergencyMetrics = groupByCondition(allData, "Emergency Department")
      .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
      .slice(0, 10);
  
    const vaccinationMetrics = groupByCondition(allData, "Healthcare Personnel Vaccination");
  
    const sepsisMetrics = groupByCondition(allData, "Sepsis Care")
      .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
      .slice(0, 10);
  
    edChart = renderChart(edCtx, emergencyMetrics, "#42a5f5");
    vaxChart = renderChart(vaxCtx, vaccinationMetrics, "#66bb6a");
    sepsisChart = renderChart(sepsisCtx, sepsisMetrics, "#ef5350");
});