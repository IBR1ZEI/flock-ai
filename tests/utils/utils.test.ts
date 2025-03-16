import {
    trimAndLowerCase,
    stringToArray,
    capitalizeFirstLetter,
    getTimeStamp,
    substractWeeksFromTimestamp
} from "../../src/utils/utils";

describe('testing utils file', () => {
    test('should trim the string and lowercase', () => {
        expect(trimAndLowerCase(' aBc ')).toBe('abc');
    });

    test('should convert string into array', () => {
        expect(stringToArray('This is test')).toStrictEqual(["This", "is", "test"]);
    });

    test('should capitalize first letter', () => {
        expect(capitalizeFirstLetter('abcd')).toBe('Abcd');
    });

    test('should get time stamp', () => {
        expect(getTimeStamp()).toBe(new Date().toISOString());
    });

    test('should subtract weeks from timestamp', () => {
        let initialTimestamp = "2025-02-15T17:35:55.101Z";
        let weeks = 2;
        let expectedTimestamp = "2025-02-01T17:35:55.101Z";
        expect(substractWeeksFromTimestamp(initialTimestamp, weeks)).toBe(expectedTimestamp);
    });
})