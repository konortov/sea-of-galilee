let constants = require(__basedir + '/constants.js');

class seaDeepByYearsToSend {
    constructor() {
        this.data = {
            labels: [],
            values: []
        };
    }

    prepareData(dataToProcess) {
        for (let i = 0; i < dataToProcess.length; i++) {
            this.data.labels.push(dataToProcess[i][constants.csvDateHeaderString].getFullYear());
            this.data.values.push(parseInt(dataToProcess[i][constants.csvDeepHeaderString]));
        }
    }
}

module.exports = seaDeepByYearsToSend;

