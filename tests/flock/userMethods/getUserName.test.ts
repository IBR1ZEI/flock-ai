import { getUserName } from "../../../src/flock/userMethods/getUserName";
process.loadEnvFile();

const testUserToken = process.env.TEST_USER_TOKEN;
const testUserId = process.env.TEST_USER_ID;

describe('testing flock/userMethods/getUserName file', () => {
    test('should trim the string and lowercase', async () => {
        const name = await getUserName(testUserToken, testUserId);
        expect(name).toBe('Oleh Mats | UA');
    });
});

