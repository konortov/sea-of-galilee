function drawGraph() {
    fetch('/seaChangeForEachMonth', {
        method: 'get',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'}
    }).then(function (response) {
        return response.json();
    }).then(function (response) {
        let ctx = document.getElementById("monthAverageChangeChart").getContext('2d');
        let monthAverageChangeChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: response['labels'],
                datasets: [{
                    label: 'Average Change In Deep (Meters)',
                    data: response['values'],
                    backgroundColor: 'rgba(0, 130, 220, 0.3)',
                    borderColor: 'rgba(0,130,220,0.4)',
                    borderWidth: 1,
                    fill: false
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        },

                    }]
                }

            }
        });
    });

}

drawGraph();