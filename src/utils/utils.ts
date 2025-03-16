export function trimAndLowerCase(str: string): string {
    if (!str) return "";

    return str.trim().toLowerCase();
}

export function stringToArray(str: string): string[] {
    if (!str) return [""];

    return str.split(" ");
}

export function capitalizeFirstLetter(str: string): string {
    if (!str) return "";

    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getTimeStamp(): string {
    return new Date().toISOString();
}

export function substractWeeksFromTimestamp(
    initialTimestamp: string,
    weeks: number
): string {
    const initialTimestampToDate = new Date(initialTimestamp);
    // @ts-ignore
    const weeksAgoTimestamp = new Date(initialTimestampToDate - weeks * 7 * 24 * 60 * 60 * 1000);
    return weeksAgoTimestamp.toISOString();
}

let timestamp = "2025-02-15T17:35:55.101Z";
console.log(substractWeeksFromTimestamp(timestamp, 2));
