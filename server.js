// so it will be easier to require in different modules
let path = require('path');
global.__basedir = path.resolve(__dirname);

// imports section
let constants = require('./constants');
let csvReader = require('./readCsvFile');
let monthsAvgChangeToSend = require('./objects/monthsAvgChangeToSend.js');
let seaDeepByYearsToSend = require('./objects/seaDeepByYearsToSend.js');
let express = require('express');

let bodyParser = require('body-parser');
//global variables for this module
let app = express();
let readedCsvData;
let firstDayOfEachYearArray;
let monthsAverageChangeReadyToSend;
let seaDeepByYearsReadyToSend;


//handle requests section
app.use(bodyParser.json());
app.use(express.static(__dirname + '/www'));
app.get('/', (req, res) => res.sendFile(__dirname + "/www/index.html"));


app.get(constants.urlGetSeaDeepByYears, function (req, res) {
    res.send(seaDeepByYearsReadyToSend);
});

app.get(constants.urlGetSeaChangeForEachMonth, function (req, res) {
    res.send(monthsAverageChangeReadyToSend);
});

app.post(constants.urlGetXLastDaysDeep, function (req, res) {
    let numberOfDays = req.body[constants.reqLastXDaysString];
    let dataToSend = {
        labels: [],
        values: []
    };
    //avoid large requests
    if (numberOfDays >= 365) {
        console.log('got' + constants.urlGetXLastDaysDeep + 'request - send error status (400) and ignore it');
        res.status(400).send();
    } else {
        for (let i = readedCsvData.length - 1; i >= readedCsvData.length - numberOfDays; i--) {
            dataToSend['labels'].push(createDateString(readedCsvData[i][constants.csvDateHeaderString]));
            dataToSend['values'].push(parseInt(readedCsvData[i][constants.csvDeepHeaderString]));
        }
        dataToSend['labels'].reverse();
        dataToSend['values'].reverse();
        res.send(dataToSend);
    }
});

app.get(constants.urlCurrentYearDeep, function (req, res) {
    let currentIndex = readedCsvData.length - 1;
    let dataToSend = {
        labels: constants.yearMonths,
        values: Array.apply(null, Array(readedCsvData[currentIndex][constants.csvDateHeaderString].getMonth())
            .map(Number.prototype.valueOf,0))
    };
    let currentYear = readedCsvData[currentIndex][constants.csvDateHeaderString].getFullYear();

    // While we in the same year (the current one)
    while(currentYear === readedCsvData[currentIndex][constants.csvDateHeaderString].getFullYear()) {
        // If current sample is the first one of this month
        if (readedCsvData[currentIndex][constants.csvDateHeaderString].getMonth() !==
            readedCsvData[currentIndex - 1][constants.csvDateHeaderString].getMonth()) {
            dataToSend['values'][readedCsvData[currentIndex][constants.csvDateHeaderString].getMonth() - 1]
                = readedCsvData[currentIndex][constants.csvDeepHeaderString];
        }
        currentIndex--;
    }
    res.send(dataToSend);
});

// Runs The Server
preProcessingBeforeServerIsReadyForRequests().then(() => app.listen(constants.serverPort, function () {
    console.log("server listening on port " + constants.serverPort)
}));

//Helper function section:
async function preProcessingBeforeServerIsReadyForRequests() {
    readedCsvData = await csvReader.readFromCsvFile(constants.csvDataFilePath);
    firstDayOfEachYearArray = createDataArrayOfFirstDayInEachYear(readedCsvData);
    monthsAverageChangeReadyToSend = createMonthAverageChangeToSend(readedCsvData);
    seaDeepByYearsReadyToSend = createSeaDeepByYearsToSend(firstDayOfEachYearArray);
}

function createDataArrayOfFirstDayInEachYear(data) {
    let result = [];
    result.push(readedCsvData[0]);
    let currentYear = readedCsvData[0][constants.csvDateHeaderString].getFullYear();
    for (let i = 1; i < data.length; i++) {
        if (currentYear !== readedCsvData[i][constants.csvDateHeaderString].getFullYear()) {
            result.push(readedCsvData[i]);
            currentYear = readedCsvData[i][constants.csvDateHeaderString].getFullYear();
        }
    }
    return result;

}

function createMonthAverageChangeToSend(data) {
        let result = new monthsAvgChangeToSend();
        result.prepareData(data);
        return result.data;
}

function createSeaDeepByYearsToSend(data) {
    let result = new seaDeepByYearsToSend();
    result.prepareData(data);
    return result.data;
}

function createDateString(dateObject) {
    return ("" + dateObject.getDate() + "/" + dateObject.getMonth() + "/" + dateObject.getFullYear());
}
