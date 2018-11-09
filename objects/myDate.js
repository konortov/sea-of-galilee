class myDate {
    constructor(stringDate) {
        let splitRes = stringDate.split("/", 3);
        this.day = parseInt(splitRes[0]);
        this.month = parseInt(splitRes[1]);
        this.year = parseInt(splitRes[2]);
    }


    static compare(a, b) {
        if (compareNumbers(a.year, b.year) !== 0) {
            return compareNumbers(a.year, b.year);
        }
        else if (compareNumbers(a.month, b.month) !== 0) {
            return compareNumbers(a.month, b.month);
        }
        else if (compareNumbers(a.day, b.day) !== 0) {
            return compareNumbers(a.day, b.day);
        }
        return 0;
    }
}

module.exports = myDate;

function compareNumbers(a, b) {
    if (a > b) {
        return -1;
    } else if (a < b) {
        return 1;
    }
    return 0;
}