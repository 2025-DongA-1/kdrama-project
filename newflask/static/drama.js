/**
 * 2010년대 TV 드라마 수를 표시하는 막대 차트 생성 함수
 * API에서 데이터를 가져와 Chart.js로 시각화
 */
async function createtvbarChart2010() {
    // API로부터 2010년대 TV 드라마 데이터 요청
    const response = await fetch('/api/bar-data-2010');
    const data = await response.json();

    // 차트를 렌더링할 캔버스 요소 가져오기
    const tv2010 = document.getElementById('barChart2010');

    // Chart.js 인스턴스 생성
    const tv2010Chart = new Chart(tv2010, {
        type: 'bar', // 차트 타입: 막대 차트
        data: {
            labels: data.labels, // X축 레이블 (연도별)
            datasets: [{
                label: '드라마 수', // 데이터셋 레이블
                data: data.values, // Y축 값 (드라마 개수)
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // 막대 배경색 (파란색, 투명도 70%)
                borderColor: 'rgba(54, 162, 235, 1)', // 막대 테두리 색
                borderWidth: 1 // 테두리 두께
            }]
        },
        options: {
            responsive: true, // 반응형 차트 활성화
            maintainAspectRatio: false, // 비율 유지 비활성화 (컨테이너 크기에 맞춤)
            plugins: {
                legend: {
                    display: true, // 범례 표시
                    position: 'top' // 범례 위치: 상단
                },
                title: {
                    display: true, // 제목 표시
                    text: '2010년대 tv 드라마 수', // 차트 제목
                    font: {
                        size: 18, // 제목 폰트 크기
                        weight: 'bold' // 제목 폰트 굵기
                    }
                }
            }
        }
    });
}

/**
 * 2020년대 TV 드라마 수를 표시하는 막대 차트 생성 함수
 */
async function createtvbarChart2020() {
    // API로부터 2020년대 TV 드라마 데이터 요청
    const response = await fetch('/api/bar-data-2020');
    const data = await response.json();

    // 차트를 렌더링할 캔버스 요소 가져오기
    const tv2020 = document.getElementById('barChart2020');

    // Chart.js 인스턴스 생성
    const tv2020Chart = new Chart(tv2020, {
        type: 'bar', // 차트 타입: 막대 차트
        data: {
            labels: data.labels, // X축 레이블 (연도별)
            datasets: [{
                label: '드라마 수', // 데이터셋 레이블
                data: data.values, // Y축 값 (드라마 개수)
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // 막대 배경색
                borderColor: 'rgba(54, 162, 235, 1)', // 막대 테두리 색
                borderWidth: 1 // 테두리 두께
            }]
        },
        options: {
            responsive: true, // 반응형 차트
            maintainAspectRatio: false, // 비율 유지 비활성화
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: '2020년대 tv 드라마 수',
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

/**
 * 2010년대 OTT 드라마 수를 표시하는 막대 차트 생성 함수
 * OTT: Over-The-Top (넷플릭스, 디즈니+ 등 스트리밍 플랫폼)
 */
async function createtvbarChartott2010() {
    // API로부터 2010년대 OTT 드라마 데이터 요청
    const response = await fetch('/api/bar-ott-2010');
    const data = await response.json();

    // 차트를 렌더링할 캔버스 요소 가져오기
    const ott2010 = document.getElementById('barChartott2010');

    // Chart.js 인스턴스 생성
    const ott2010Chart = new Chart(ott2010, {
        type: 'bar', // 차트 타입: 막대 차트
        data: {
            labels: data.labels, // X축 레이블
            datasets: [{
                label: '드라마 수',
                data: data.values,
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: '2010년대 ott 드라마 수',
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

/**
 * 2020년대 OTT 드라마 수를 표시하는 막대 차트 생성 함수
 */
async function createtvbarChartott2020() {
    // API로부터 2020년대 OTT 드라마 데이터 요청
    const response = await fetch('/api/bar-ott-2020');
    const data = await response.json();

    // 차트를 렌더링할 캔버스 요소 가져오기
    const ott2020 = document.getElementById('barChartott2020');

    // Chart.js 인스턴스 생성
    const ott2020Chart = new Chart(ott2020, {
        type: 'bar',
        data: {
            labels: data.labels,
            datasets: [{
                label: '드라마 수',
                data: data.values,
                backgroundColor: 'rgba(54, 162, 235, 0.7)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                },
                title: {
                    display: true,
                    text: '2020년대 ott 드라마 수',
                    font: {
                        size: 18,
                        weight: 'bold'
                    }
                }
            }
        }
    });
}

// ============================================
// 연도별 이합 파이 차트 섹션
// ============================================

/**
 * 2010년대 전체 드라마 비율을 표시하는 파이 차트 생성 함수
 * 각 세그먼트에 퍼센트 값을 표시하는 커스텀 플러그인 포함
 */
async function createPieChart2010() {
    // API로부터 2010년대 파이 차트 데이터 요청
    const response = await fetch('/api/pie-data-2010');
    const data = await response.json();

    // 2D 렌더링 컨텍스트 가져오기
    const pie2010 = document.getElementById('pieChart2010').getContext('2d');
    
    new Chart(pie2010, {
        type: 'pie', // 차트 타입: 파이 차트
        data: {
            labels: data.labels, // 각 세그먼트의 레이블
            datasets: [{
                data: data.values, // 각 세그먼트의 값
                backgroundColor: data.backgroundColor, // 각 세그먼트의 배경색 배열
                borderWidth: 2, // 세그먼트 경계선 두께
                borderColor: '#fff' // 세그먼트 경계선 색 (흰색)
            }]
        },
        options: {
            responsive: true, // 반응형 차트
            maintainAspectRatio: false, // 비율 유지 비활성화
            plugins: {
                legend: {
                    position: 'bottom', // 범례 위치: 하단
                    labels: {
                        padding: 15, // 범례 항목 간 간격
                        font: {
                            size: 12 // 범례 폰트 크기
                        }
                    }
                },
                title: {
                    display: false // 제목 표시 안 함
                },
                tooltip: {
                    callbacks: {
                        // 툴팁 레이블 커스터마이징: "레이블: 값 (퍼센트%)" 형식
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        },
        plugins: [{
            // 커스텀 플러그인: 각 파이 세그먼트에 퍼센트 텍스트 표시
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx; // 캔버스 컨텍스트
                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach((element, index) => {
                            // 텍스트 스타일 설정
                            ctx.fillStyle = '#fff'; // 텍스트 색상 (흰색)
                            ctx.font = 'bold 14px Arial'; // 텍스트 폰트
                            ctx.textAlign = 'center'; // 텍스트 정렬: 중앙
                            ctx.textBaseline = 'middle'; // 텍스트 기준선: 중간

                            // 퍼센트 계산
                            const data = dataset.data[index];
                            const total = dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((data / total) * 100).toFixed(1) + '%';

                            // 세그먼트 중앙 위치 가져오기
                            const position = element.tooltipPosition();
                            // 퍼센트 텍스트 그리기
                            ctx.fillText(percentage, position.x, position.y);
                        });
                    }
                });
            }
        }]
    });
}

/**
 * 2020년대 전체 드라마 비율을 표시하는 파이 차트 생성 함수
 */
async function createPieChart2020() {
    const response = await fetch('/api/pie-data-2020');
    const data = await response.json();

    const pie2020 = document.getElementById('pieChart2020').getContext('2d');
    
    new Chart(pie2020, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: data.backgroundColor,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach((element, index) => {
                            ctx.fillStyle = '#fff';
                            ctx.font = 'bold 14px Arial';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            const data = dataset.data[index];
                            const total = dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((data / total) * 100).toFixed(1) + '%';

                            const position = element.tooltipPosition();
                            ctx.fillText(percentage, position.x, position.y);
                        });
                    }
                });
            }
        }]
    });
}

/**
 * 2010년대 TV 드라마 방영 시기별 비율 파이 차트 생성 함수
 */
async function createPiedateChart2010() {
    const response = await fetch('/api/pie-tv-2010');
    const data = await response.json();

    const piedate2010 = document.getElementById('piedateChart2010').getContext('2d');
    
    new Chart(piedate2010, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: data.backgroundColor,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach((element, index) => {
                            ctx.fillStyle = '#fff';
                            ctx.font = 'bold 14px Arial';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            const data = dataset.data[index];
                            const total = dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((data / total) * 100).toFixed(1) + '%';

                            const position = element.tooltipPosition();
                            ctx.fillText(percentage, position.x, position.y);
                        });
                    }
                });
            }
        }]
    });
}

/**
 * 2020년대 TV 드라마 방영 시기별 비율 파이 차트 생성 함수
 */
async function createPiedateChart2020() {
    const response = await fetch('/api/pie-tv-2020');
    const data = await response.json();

    const piedate2020 = document.getElementById('piedateChart2020').getContext('2d');
    
    new Chart(piedate2020, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: data.backgroundColor,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach((element, index) => {
                            ctx.fillStyle = '#fff';
                            ctx.font = 'bold 14px Arial';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            const data = dataset.data[index];
                            const total = dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((data / total) * 100).toFixed(1) + '%';

                            const position = element.tooltipPosition();
                            ctx.fillText(percentage, position.x, position.y);
                        });
                    }
                });
            }
        }]
    });
}

/**
 * 2010년대 OTT 드라마 방영 시기별 비율 파이 차트 생성 함수
 */
async function createPieottdateChart2010() {
    const response = await fetch('/api/pie-ott-2010');
    const data = await response.json();

    const pieottdate2010 = document.getElementById('pieottChart2010').getContext('2d');
    
    new Chart(pieottdate2010, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: data.backgroundColor,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach((element, index) => {
                            ctx.fillStyle = '#fff';
                            ctx.font = 'bold 14px Arial';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            const data = dataset.data[index];
                            const total = dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((data / total) * 100).toFixed(1) + '%';

                            const position = element.tooltipPosition();
                            ctx.fillText(percentage, position.x, position.y);
                        });
                    }
                });
            }
        }]
    });
}

/**
 * 2020년대 OTT 드라마 방영 시기별 비율 파이 차트 생성 함수
 */
async function createPieottdateChart2020() {
    const response = await fetch('/api/pie-ott-2020');
    const data = await response.json();

    const pieottdate2020 = document.getElementById('pieottChart2020').getContext('2d');
    
    new Chart(pieottdate2020, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: data.backgroundColor,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach((element, index) => {
                            ctx.fillStyle = '#fff';
                            ctx.font = 'bold 14px Arial';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            const data = dataset.data[index];
                            const total = dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((data / total) * 100).toFixed(1) + '%';

                            const position = element.tooltipPosition();
                            ctx.fillText(percentage, position.x, position.y);
                        });
                    }
                });
            }
        }]
    });
}

/**
 * 2010년대 전체(TV+OTT) 드라마 방영 시기별 비율 파이 차트 생성 함수
 */
async function createPiealldateChart2010() {
    const response = await fetch('/api/pie-alldate-2010');
    const data = await response.json();

    const piealldate2010 = document.getElementById('pieallChart2010').getContext('2d');
    
    new Chart(piealldate2010, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: data.backgroundColor,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach((element, index) => {
                            ctx.fillStyle = '#fff';
                            ctx.font = 'bold 14px Arial';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            const data = dataset.data[index];
                            const total = dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((data / total) * 100).toFixed(1) + '%';

                            const position = element.tooltipPosition();
                            ctx.fillText(percentage, position.x, position.y);
                        });
                    }
                });
            }
        }]
    });
}

/**
 * 2020년대 전체(TV+OTT) 드라마 방영 시기별 비율 파이 차트 생성 함수
 */
async function createPiealldateChart2020() {
    const response = await fetch('/api/pie-alldate-2020');
    const data = await response.json();

    const piealldate2020 = document.getElementById('pieallChart2020').getContext('2d');
    
    new Chart(piealldate2020, {
        type: 'pie',
        data: {
            labels: data.labels,
            datasets: [{
                data: data.values,
                backgroundColor: data.backgroundColor,
                borderWidth: 2,
                borderColor: '#fff'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 12
                        }
                    }
                },
                title: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            }
        },
        plugins: [{
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach((element, index) => {
                            ctx.fillStyle = '#fff';
                            ctx.font = 'bold 14px Arial';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';

                            const data = dataset.data[index];
                            const total = dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((data / total) * 100).toFixed(1) + '%';

                            const position = element.tooltipPosition();
                            ctx.fillText(percentage, position.x, position.y);
                        });
                    }
                });
            }
        }]
    });
}

async function createtvgenbarChart2010() {
    // API로부터 2010년대 TV 드라마 데이터 요청
    const response = await fetch('/api/bargen-data-2010');
    const data = await response.json();

    // 차트를 렌더링할 캔버스 요소 가져오기
    const tvgen2010 = document.getElementById('bargenChart2010');

    // Chart.js 인스턴스 생성
    const tvgen2010Chart = new Chart(tvgen2010, {
        type: 'bar', // 차트 타입: 막대 차트
        data: {
            labels: data.labels, // X축 레이블 (연도별)
            datasets: [{
                label: '장르 수', // 데이터셋 레이블
                data: data.values, // Y축 값 (드라마 개수)
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // 막대 배경색 (파란색, 투명도 70%)
                borderColor: 'rgba(54, 162, 235, 1)', // 막대 테두리 색
                borderWidth: 1 // 테두리 두께
            }]
        },
        options: {
            responsive: true, // 반응형 차트 활성화
            maintainAspectRatio: false, // 비율 유지 비활성화 (컨테이너 크기에 맞춤)
            plugins: {
                legend: {
                    display: true, // 범례 표시
                    position: 'top' // 범례 위치: 상단
                },
                title: {
                    display: true, // 제목 표시
                    text: '2010년대 tv 장르 수', // 차트 제목
                    font: {
                        size: 18, // 제목 폰트 크기
                        weight: 'bold' // 제목 폰트 굵기
                    }
                }
            }
        }
    });
}

async function createtvgenbarChart2020() {
    // API로부터 2020년대 TV 드라마 데이터 요청
    const response = await fetch('/api/bargen-data-2020');
    const data = await response.json();

    // 차트를 렌더링할 캔버스 요소 가져오기
    const tvgen2020 = document.getElementById('bargenChart2020');

    // Chart.js 인스턴스 생성
    const tvgen2020Chart = new Chart(tvgen2020, {
        type: 'bar', // 차트 타입: 막대 차트
        data: {
            labels: data.labels, // X축 레이블 (연도별)
            datasets: [{
                label: '장르 수', // 데이터셋 레이블
                data: data.values, // Y축 값 (드라마 개수)
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // 막대 배경색 (파란색, 투명도 70%)
                borderColor: 'rgba(54, 162, 235, 1)', // 막대 테두리 색
                borderWidth: 1 // 테두리 두께
            }]
        },
        options: {
            responsive: true, // 반응형 차트 활성화
            maintainAspectRatio: false, // 비율 유지 비활성화 (컨테이너 크기에 맞춤)
            plugins: {
                legend: {
                    display: true, // 범례 표시
                    position: 'top' // 범례 위치: 상단
                },
                title: {
                    display: true, // 제목 표시
                    text: '2020년대 tv 장르 수', // 차트 제목
                    font: {
                        size: 18, // 제목 폰트 크기
                        weight: 'bold' // 제목 폰트 굵기
                    }
                }
            }
        }
    });
}

async function createottgenbarChart2010() {
    // API로부터 2020년대 OTT 드라마 데이터 요청
    const response = await fetch('/api/bargen-ott-2010');
    const data = await response.json();

    // 차트를 렌더링할 캔버스 요소 가져오기
    const ottgen2020 = document.getElementById('barottgenChart2010');

    // Chart.js 인스턴스 생성
    const ottgen2020Chart = new Chart(ottgen2020, {
        type: 'bar', // 차트 타입: 막대 차트
        data: {
            labels: data.labels, // X축 레이블 (연도별)
            datasets: [{
                label: '장르 수', // 데이터셋 레이블
                data: data.values, // Y축 값 (드라마 개수)
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // 막대 배경색 (파란색, 투명도 70%)
                borderColor: 'rgba(54, 162, 235, 1)', // 막대 테두리 색
                borderWidth: 1 // 테두리 두께
            }]
        },
        options: {
            responsive: true, // 반응형 차트 활성화
            maintainAspectRatio: false, // 비율 유지 비활성화 (컨테이너 크기에 맞춤)
            plugins: {
                legend: {
                    display: true, // 범례 표시
                    position: 'top' // 범례 위치: 상단
                },
                title: {
                    display: true, // 제목 표시
                    text: '2010년대 ott 장르 수', // 차트 제목
                    font: {
                        size: 18, // 제목 폰트 크기
                        weight: 'bold' // 제목 폰트 굵기
                    }
                }
            }
        }
    });
}
async function createottgenbarChart2020() {
    // API로부터 2020년대 OTT 드라마 데이터 요청
    const response = await fetch('/api/bargen-ott-2020');
    const data = await response.json();

    // 차트를 렌더링할 캔버스 요소 가져오기
    const ottgen2020 = document.getElementById('barottgenChart2020');

    // Chart.js 인스턴스 생성
    const ottgen2020Chart = new Chart(ottgen2020, {
        type: 'bar', // 차트 타입: 막대 차트
        data: {
            labels: data.labels, // X축 레이블 (연도별)
            datasets: [{
                label: '장르 수', // 데이터셋 레이블
                data: data.values, // Y축 값 (드라마 개수)
                backgroundColor: 'rgba(54, 162, 235, 0.7)', // 막대 배경색 (파란색, 투명도 70%)
                borderColor: 'rgba(54, 162, 235, 1)', // 막대 테두리 색
                borderWidth: 1 // 테두리 두께
            }]
        },
        options: {
            responsive: true, // 반응형 차트 활성화
            maintainAspectRatio: false, // 비율 유지 비활성화 (컨테이너 크기에 맞춤)
            plugins: {
                legend: {
                    display: true, // 범례 표시
                    position: 'top' // 범례 위치: 상단
                },
                title: {
                    display: true, // 제목 표시
                    text: '2020년대 ott 장르 수', // 차트 제목
                    font: {
                        size: 18, // 제목 폰트 크기
                        weight: 'bold' // 제목 폰트 굵기
                    }
                }
            }
        }
    });
}
/**
 * 페이지 로드 시 모든 차트 초기화
 * window.addEventListener('load')를 사용하여 DOM이 완전히 로드된 후 실행
 */
window.addEventListener('load', () => {
    // 막대 차트 생성 (TV & OTT, 2010년대 & 2020년대)
    createtvbarChart2010();
    createtvbarChart2020();
    createtvbarChartott2010();
    createtvbarChartott2020();
    
    // 파이 차트 생성 (전체 비율)
    createPieChart2010();
    createPieChart2020();
    
    // 파이 차트 생성 (TV 방영 시기별)
    createPiedateChart2010();
    createPiedateChart2020();
    
    // 파이 차트 생성 (OTT 방영 시기별)
    createPieottdateChart2010();
    createPieottdateChart2020();
    
    // 파이 차트 생성 (전체 방영 시기별)
    createPiealldateChart2010();
    createPiealldateChart2020();

    // 바 차트 생성 (tv 장르 수)
    createtvgenbarChart2010();
    createtvgenbarChart2020();

    // 바 차트 생성 (ott 장르 수)
    createottgenbarChart2010();
    createottgenbarChart2020();
});