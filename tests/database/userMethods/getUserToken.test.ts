import { client } from '../../../src/database/dbOperations';
import { getUserTokenFromDb } from '../../../src/database/userMethods/getUserToken';

jest.mock('../../../src/database/dbOperations', () => ({
    client: {
        db: jest.fn().mockReturnThis(),
        collection: jest.fn().mockReturnThis(),
        findOne: jest.fn(),
    },
}));

describe('getUserTokenFromDb', () => {
    const testUserId = 'testUserId';
    const testUserToken = 'testUserToken';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return user token if user exists', async () => {
        const mockFindOne = client.collection().findOne as jest.Mock;
        mockFindOne.mockResolvedValue({ userToken: testUserToken });

        const result = await getUserTokenFromDb(testUserId);

        expect(client.db).toHaveBeenCalledWith(process.env.DATABASE_NAME);
        expect(client.collection).toHaveBeenCalledWith('users'); // Replace 'users' with your actual collection name
        expect(mockFindOne).toHaveBeenCalledWith(
            { userId: testUserId },
            { projection: { userToken: 1, _id: 0 } }
        );
        expect(result).toEqual(testUserToken);
    });

    it('should return null if user does not exist', async () => {
        const mockFindOne = client.collection().findOne as jest.Mock;
        mockFindOne.mockResolvedValue(null);

        const result = await getUserTokenFromDb(testUserId);

        expect(result).toBeNull();
    });

    it('should handle errors', async () => {
        const mockFindOne = client.collection().findOne as jest.Mock;
        const errorMessage = 'Error getting user token';
        mockFindOne.mockRejectedValue(new Error(errorMessage));

        console.log = jest.fn();

        const result = await getUserTokenFromDb(testUserId);

        expect(console.log).toHaveBeenCalledWith(`Error getting user token: Error: ${errorMessage}`);
        expect(result).toBeUndefined();
    });
});