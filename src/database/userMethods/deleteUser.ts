import { client } from "../dbOperations";

const databaseName: string = process.env.DATABASE_NAME;
const installedUsersCollection: string = process.env.INSTALLED_USERS_COLLECTION;

//delete user from DB by userId
export async function deleteUserFromDb(
  userId: string
): Promise<object> {
  try {
    const database = client.db(databaseName);
    const installedUsers = database.collection(installedUsersCollection);
    const user = { userId: userId };
    console.log(`Deleting user from DB: ${userId}`);
    return await installedUsers.deleteOne(user);
  } catch (error) {
    console.log(`Error during deleting user: ${error}`);
  }
}

