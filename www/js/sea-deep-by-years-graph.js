function drawGraph() {

    fetch('/seaDeepByYears', {
        method: 'get',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        let ctx = document.getElementById("fullHistoryChart").getContext('2d');
        let fullHistoryChart = new Chart(ctx, {
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

drawGraph();