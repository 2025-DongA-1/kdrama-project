async function createtvbarChart2010() {
            const response = await fetch('/api/bar-data-2010');
            const data = await response.json();

            const tv2010 = document.getElementById('barChart2010');

            const tv2010Chart = new Chart(tv2010,{
                type : 'bar',
                data : {
                    labels : data.labels,
                    datasets : [{
                        label: '드라마 수',
                        data: data.values,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)', 
                        borderColor: 'rgba(54, 162, 235, 1)',  
                        borderWidth: 1 
                    }]
                },options: { 
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: true,
                            position: 'top'
                        },
                        title: {
                            display: true,
                            text: '2010년대 tv 드라마 수',
                            font: {
                                size: 18,
                                weight: 'bold'
                            }
                        }
                    }       
                }
            });
};

async function createtvbarChart2020() {
            const response = await fetch('/api/bar-data-2020');
            const data = await response.json();

            const tv2020 = document.getElementById('barChart2020');

            const tv2020Chart = new Chart(tv2020,{
                type : 'bar',
                data : {
                    labels : data.labels,
                    datasets : [{
                        label: '드라마 수',
                        data: data.values,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)', 
                        borderColor: 'rgba(54, 162, 235, 1)',  
                        borderWidth: 1 
                    }]
                },options: { 
                    responsive: true,
                    maintainAspectRatio: false,
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
};

async function createtvbarChartott2010() {
            const response = await fetch('/api/bar-ott-2010');
            const data = await response.json();

            const ott2010 = document.getElementById('barChartott2010');

            const ott2010Chart = new Chart(ott2010,{
                type : 'bar',
                data : {
                    labels : data.labels,
                    datasets : [{
                        label: '드라마 수',
                        data: data.values,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)', 
                        borderColor: 'rgba(54, 162, 235, 1)',  
                        borderWidth: 1 
                    }]
                },options: { 
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
};

async function createtvbarChartott2020() {
            const response = await fetch('/api/bar-ott-2020');
            const data = await response.json();

            const ott2020 = document.getElementById('barChartott2020');

            const ott2020Chart = new Chart(ott2020,{
                type : 'bar',
                data : {
                    labels : data.labels,
                    datasets : [{
                        label: '드라마 수',
                        data: data.values,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)', 
                        borderColor: 'rgba(54, 162, 235, 1)',  
                        borderWidth: 1 
                    }]
                },options: { 
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
};

// 연도별 총합

async function createPieChart2010() {
            const response = await fetch('/api/pie-data-2010');
            const data = await response.json();

            const pie2010 = document.getElementById('pieChart2010').getContext('2d');
            new Chart(pie2010, {
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
        };

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
        };


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
        };

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
        };

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
        };

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
        };

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
        };

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
        };

window.addEventListener('load', () => {
            createtvbarChart2010();
            createtvbarChart2020();
            createtvbarChartott2010();
            createtvbarChartott2020();
            createPieChart2010();
            createPieChart2020();
            createPiedateChart2010();
            createPiedateChart2020();
            createPieottdateChart2010();
            createPieottdateChart2020();
            createPiealldateChart2010();
            createPiealldateChart2020();
        });