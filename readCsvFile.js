let csv = require('fast-csv');
let constants = require('./constants');
let myDate = require('./objects/myDate.js');

module.exports = {
    readFromCsvFile: async function (fileFullPath) {
        return new Promise(function (resolve) {
            let readedDataArray = [];
            csv.fromPath(fileFullPath, {
                ignoreEmpty: true,
                headers: [constants.csvDateHeaderString, constants.csvDeepHeaderString, constants.csvChangeRateHeaderString],
                renameHeaders: true
            })
                .on("data", function (data) {
                    data[constants.csvDateHeaderString] = createDateObjectFromString(data[constants.csvDateHeaderString]);
                    readedDataArray.push(fixDeformedData(data));
                })
                .on("end", function () {
                    console.log("done reading from csv");
                    resolve(readedDataArray.reverse());
                });
        });
    }
};

//Handle the case of some missing / deformed data in line (currently replace empty values with 0)
function fixDeformedData(data) {
    Object.keys(data).forEach(function (key) {
        if (data[key] === "") {
            data[key] = "0";
        }
    });
    return data;
}

// using myDate in order to convert the dd/mm/yyyy format to regular JS Date object
function createDateObjectFromString(date) {
    let tempMyDate = new myDate(date);
    return new Date(tempMyDate.year, tempMyDate.month, tempMyDate.day);
}