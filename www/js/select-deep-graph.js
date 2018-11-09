let lineChart;
let drawXDaysGraph = function () {
    if (document.getElementById("last-days").value > 0) {
        if (lineChart) {
            lineChart.destroy();
        }
        if (document.getElementById("last-days").value === '365') {
            drawCurrentYearGraph();
        } else {
            fetch('/lastDays', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'days': document.getElementById("last-days").value})
            }).then(function (response) {
                return response.json();
            }).then(function (response) {
                let ctx = document.getElementById("last-x-days-graph").getContext('2d');
                lineChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: response['labels'],
                        datasets: [{
                            label: 'Deep (Meters)',
                            data: response['values'],
                            backgroundColor: 'rgba(0, 130, 220, 0.3)',
                            borderColor: 'rgba(0,130,220,0.4)',
                            borderWidth: 1,
                            fill: 'bottom'
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: false,
                                    suggestedMax: Math.max.apply(null, response['values']) + 1,
                                    suggestedMin: Math.min.apply(null, response['values']) - 1
                                },
                            }]
                        }
                    }
                });

            });
        }}
};


function drawCurrentYearGraph() {
    fetch('/currentYear', {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        let ctx = document.getElementById("last-x-days-graph").getContext('2d');
        let lastXDaysGraph = new Chart(ctx, {
            type: 'line',
            data: {
                labels: response['labels'],
                datasets: [{
                    label: 'Deep (Meters)',
                    data: response['values'],
                    backgroundColor: 'rgba(0, 130, 220, 0.3)',
                    borderColor: 'rgba(0,130,220,0.4)',
                    borderWidth: 1,
                    fill: 'bottom'
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false,
                            suggestedMax: Math.max.apply(null, response['values']) + 1,
                            suggestedMin: Math.min.apply(null, response['values']) - 1
                        },
                    }]
                }
            }
        });
    });
}


document.getElementById('last-days').addEventListener('change', drawXDaysGraph);