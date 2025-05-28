import { client } from "../dbOperations";

const databaseName: string = process.env.DATABASE_NAME;
const installedUsersCollection: string = process.env.INSTALLED_USERS_COLLECTION;

//add user to DB installed_users
export async function addUserToDb(
  userId: string,
  userToken: string,
  userName: string
): Promise<object> {
  try {
    const database = client.db(databaseName);
    const installedUsers = database.collection(installedUsersCollection);
    const user = {
      userId: userId,
      userToken: userToken,
      userName: userName
    };
    console.log(`Adding user to DB:`);
    console.table(user)
    return await installedUsers.insertOne(user);
  } catch (error) {
    console.log(`Error writing user to DB: ${error}`);
  }
}
