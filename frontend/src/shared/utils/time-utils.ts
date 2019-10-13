export const convertToTimeSpent = (formattedTime1, formattedTime2) => {
    const timeDiff = convertToMinutes(formattedTime2) - convertToMinutes(formattedTime1);
    return convertToHoursAndMinutes(timeDiff);
};

export const convertToHoursAndMinutes = (minutes) => {
    return minutes / 60 + "h " + minutes % 60 + "m";
};

export const convertToMinutes = (formattedTime) => {
    if (formattedTime.equals("")) {
        return 0;
    }
    if (!formattedTime.contains("h") && !formattedTime.contains("m")) {
        let hours = formattedTime.substring(0, formattedTime.indexOf(":"));
        if (hours < 9) {
            hours += 12;
        }
        hours *= 60;
        return hours + formattedTime.substring(formattedTime.indexOf(":") + 1);
    } else {
        const hours = formattedTime.substring(0, formattedTime.indexOf("h")) * 60;
        const minutes = formattedTime.substring(formattedTime.indexOf("h") + 1, formattedTime.indexOf("m")).trim();
        return hours + minutes;
    }
}