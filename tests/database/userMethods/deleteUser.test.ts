import { client } from '../../../src/database/dbOperations';
import { deleteUserFromDb } from '../../../src/database/userMethods/deleteUser';

jest.mock('../../../src/database/dbOperations', () => ({
    client: {
        db: jest.fn().mockReturnThis(),
        collection: jest.fn().mockReturnThis(),
        deleteOne: jest.fn(),
    },
}));

describe('deleteUserFromDb', () => {
    const testUserId = 'testUserId';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete a user from the database', async () => {
        const mockDeleteOne = client.collection().deleteOne as jest.Mock;
        mockDeleteOne.mockResolvedValue({ deletedCount: 1 });

        const result = await deleteUserFromDb(testUserId);

        expect(client.db).toHaveBeenCalledWith(process.env.DATABASE_NAME);
        expect(client.collection).toHaveBeenCalledWith(process.env.INSTALLED_USERS_COLLECTION);
        expect(mockDeleteOne).toHaveBeenCalledWith({ userId: testUserId });
        expect(result).toEqual({ deletedCount: 1 });
    });

    it('should handle errors', async () => {
        const mockDeleteOne = client.collection().deleteOne as jest.Mock;
        const errorMessage = 'Error during deleting user';
        mockDeleteOne.mockRejectedValue(new Error(errorMessage));

        console.log = jest.fn();

        await deleteUserFromDb(testUserId);

        expect(console.log).toHaveBeenCalledWith(`Error during deleting user: Error: ${errorMessage}`);
    });
});