export function isSameDay(dateA: Date | String, dateB: Date | String) {
    let a = new Date(dateA && dateA.toString());
    let b = new Date(dateB && dateB.toString());

    return (a.getDate() === b.getDate()
        && a.getMonth() === b.getMonth()
        && a.getFullYear() === b.getFullYear());
}

export function getToday(): Date {
    let today = new Date();

    today.setHours(0, 0, 0, 0);

    return today;
}

export function toDateString(): String {
    return `${this.getFullYear()}-${this.getMonth() + 1}-${this.getDate()}`;
}

export function getDateOnly(datetime: Date) {
    datetime.setHours(0, 0, 0, 0);

    return datetime;
}

export function getStartOfDayTimeStamp(data: { utcTimeStamp: Date }) {
    let date = new Date(data.utcTimeStamp);
    date.setHours(0, 0, 0, 0);

    return date.getTime();
}

export function getStartOfMinuteTimeStamp(data: { utcTimeStamp: Date }) {
    let date = new Date(data.utcTimeStamp);
    date.setHours(date.getHours(), date.getMinutes(), 0, 0);

    return date.getTime();
}