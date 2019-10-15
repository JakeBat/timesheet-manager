const formatMap = new Map([
    ['hh:mm', '^[0-1][0-9]:[0-5][0-9]$'],
    ['h:mm', '^[1-9]:[0-5][0-9]$'],
    ['hhmm', '^[0-1][0-9][0-5][0-9]$'],
    ['hmm', '^[1-9][0-5][0-9]$'],
    ['hh', '^[0-1][0-9]$'],
    ['h', '^[1-9]$']
]);

const ignoreTimeWords = ['break', 'lunch'];

export const convertToTimeSpent = (formattedTime1, formattedTime2) => {
    const timeDiff = convertToMinutes(formattedTime2) - convertToMinutes(formattedTime1);
    return convertToHoursAndMinutes(timeDiff);
};

export const convertToHoursAndMinutes = (minutes) => {
    return Math.trunc(minutes / 60) + "h " + minutes % 60 + "m";
};

export const convertToMinutes = (formattedTime) => {
    if (formattedTime === '') {
        return 0;
    }
    if (!formattedTime.includes("h") && !formattedTime.includes("m")) {
        let hours = +formattedTime.substring(0, formattedTime.indexOf(":"));
        if (hours < 9) {
            hours += 12;
        }
        hours *= 60;
        return hours + parseInt(formattedTime.substring(formattedTime.indexOf(":") + 1));
    } else {
        const hours = formattedTime.substring(0, formattedTime.indexOf("h")) * 60;
        const minutes = formattedTime.substring(formattedTime.indexOf("h") + 1, formattedTime.indexOf("m")).trim();
        return hours + parseInt(minutes);
    }
};

export const formatTimeValue = (value): string => {
    let formattedValue: string = '';
    formatMap.forEach((format, key) => {
        if (new RegExp(format).test(value)) {
            formattedValue = convertToHhMm(key, value)
        }
    });
    return formattedValue;
};

export const getIssueTotal = (data, index) => {
    let totalMinutes = 0;
    if (index === 0) {
        totalMinutes += convertToMinutes(data[0].timeSpent);
    } else {
        data.slice(0, index + 1).filter(row =>
            row.issue.toLowerCase() === data[index].issue.toLowerCase()
        ).forEach(row => {
            totalMinutes += convertToMinutes(row.timeSpent);
        });
    }
    return convertToHoursAndMinutes(totalMinutes);
};

export const getDayTotal = (data, index) => {
    let totalMinutes = 0;
    if (index === 0) {
        totalMinutes += convertToMinutes(data[0].timeSpent);
    } else {
        data.slice(0, index + 1).forEach(row => {
            totalMinutes += convertToMinutes(row.timeSpent);
        });
    }
    return convertToHoursAndMinutes(totalMinutes);
};

export const convertToHhMm = (currentFormat, value): string => {
    switch (currentFormat) {
        case ('hh:mm'):
            return value;
        case ('h:mm'):
            return '0' + value;
        case ('hhmm'):
            return value.substring(0, 2) + ':' + value.substring(2);
        case ('hmm'):
            return '0' + value.substring(0, 1) + ':' + value.substring(1);
        case ('hh'):
            return value + ':00';
        case ('h'):
            return '0' + value + ':00';
        default:
            return '';
    }
};