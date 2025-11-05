fetch('static/genre_counts.json')
  .then(response => response.json())
  .then(data => {
    // 장르 이름 (x축 라벨)
    const labels = data.map(item => item.MAIN_GENRE);

    const ctx = document.getElementById('tvChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: '2020년 이전',
            data: data.map(item => item["2010년대"]), // 2010년대 데이터
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: '2020년 이후',
            data: data.map(item => item["2020년대"]), // 2020년대 데이터
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        maintainAspectRatio: false
      }
    });
  })
  .catch(err => console.error("JSON 불러오기 실패:", err));