class Validation {
    constructor() {
        throw new TypeError("Construction of object unaccesable");
    }

    static validEmail(email) {
        if (!email || typeof(email) !== 'string')
            return false;
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    }

    static validPhoneNumber(phoneNumber) {
        if (!phoneNumber || typeof(phoneNumber) !== 'string')
            return false;
        return /^\+?\d+$/.test(phoneNumber);
    }

    static validDateFormat(date) {
        if (!date || typeof(date) !== 'string')
            return false;
        return /^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$/.test(date);
    }

    static validPrice(price) {
        if (!price || (typeof(price) === 'string' && price === ''))
            return true;

        if (Number.isNaN(Number(price)))
            return false;
        if (price < 0)
            return false;
        return true;
    }

    static validDate(date) {
        if (!Validation.validDateFormat(date))
            return false;

        let year = Number(date.substring(date.length - 4));
        let day, monthStart;
        if (date[1] !== '-') { 
            day = date.substring(0, 2);
            monthStart = 3;
        }
        else {
            day = date[0];
            monthStart = 2;
        }
        day = Number(day);
        let month;
        if (date[monthStart + 1] !== '-') { 
            month = date.substring(monthStart, monthStart + 2);
        }
        else {
            month = date[monthStart];
        }
        month = Number(month);
        
        if (year > 2030 || year < 1900)
            return false;

        if (day < 1 || day > 31 || month < 1 || month > 12)
            return false;
        if ((month === 4 || month === 6 || month === 9 || month === 11) && day > 30)
            return false;
        if (month === 2) {
            if (day > 29)
                return false;
            if (day === 29) {
                if (!(((year % 4 == 0) && // leap year
                (year % 100 != 0)) ||
                (year % 400 == 0))) 
                    return false;
            }
        }

        return true;
    }
}

export default Validation;