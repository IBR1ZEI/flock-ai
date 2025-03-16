import { client } from '../../../src/database/dbOperations';
import { addUserToDb } from '../../../src/database/userMethods/addUser';

process.loadEnvFile();


jest.mock('../../../src/database/dbOperations', () => ({
    client: {
        db: jest.fn().mockReturnThis(),
        collection: jest.fn().mockReturnThis(),
        insertOne: jest.fn(),
    },
}));

describe('testing addUserToDb', () => {
    const testUserId = 'testUserId';
    const testUserToken = 'testUserToken';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should add a user to the database', async () => {
        const mockInsertOne = client.collection().insertOne as jest.Mock;
        mockInsertOne.mockResolvedValue({ insertedId: 'someId' });

        const result = await addUserToDb(testUserId, testUserToken);

        expect(client.db).toHaveBeenCalledWith(process.env.DATABASE_NAME);
        expect(client.collection).toHaveBeenCalledWith(process.env.INSTALLED_USERS_COLLECTION);
        expect(mockInsertOne).toHaveBeenCalledWith({ userId: testUserId, userToken: testUserToken });
        expect(result).toEqual({ insertedId: 'someId' });
    });

    it('should handle errors', async () => {
        const mockInsertOne = client.collection().insertOne as jest.Mock;
        const errorMessage = 'Error writing user to DB';
        mockInsertOne.mockRejectedValue(new Error(errorMessage));

        console.log = jest.fn();

        await addUserToDb(testUserId, testUserToken);

        expect(console.log).toHaveBeenCalledWith(`Error writing user to DB: Error: ${errorMessage}`);
    });
});