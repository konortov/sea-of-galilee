let constants = require(__basedir + '/constants.js');

class monthsAvgChangeToSend {
    constructor() {
        this.data = {
            labels: constants.yearMonths,
            values: Array.apply(null, Array(12)).map(Number.prototype.valueOf,0)
        };
    }

    prepareData(dataToProcess) {
        let monthsNumOfSampales = Array.apply(null, Array(12)).map(Number.prototype.valueOf,0);
        dataToProcess.forEach(entry => {
           let entryMonth = entry[constants.csvDateHeaderString].getMonth();
           this.data.values[entryMonth] += parseFloat(entry[constants.csvChangeRateHeaderString]);
           monthsNumOfSampales[entryMonth]++;
        });
        for (let i = 0; i < this.data.values.length; i++) {
            this.data.values[i] /= monthsNumOfSampales[i];
            this.data.values[i] = parseFloat(this.data.values[i].toFixed(3));
        }
    }
}

module.exports = monthsAvgChangeToSend;

