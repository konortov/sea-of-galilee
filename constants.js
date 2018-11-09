
module.exports = {
    serverPort: 1111,
    csvDataFilePath: 'download.csv',
    csvDateHeaderString: 'date',
    csvDeepHeaderString: 'deep',
    csvChangeRateHeaderString: 'changeRate',
    yearMonths: ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"],

    //Requests data
    reqLastXDaysString: 'days',



    // URLS
    urlGetSeaDeepByYears: '/seaDeepByYears',
    urlGetSeaChangeForEachMonth: '/seaChangeForEachMonth',
    urlGetXLastDaysDeep: '/lastDays',
    urlCurrentYearDeep: '/currentYear'
};