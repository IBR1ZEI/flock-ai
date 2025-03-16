import { client } from "../dbOperations";

const databaseName: string = process.env.DATABASE_NAME;
const installedUsersCollection: string = process.env.INSTALLED_USERS_COLLECTION;

//add user to DB installed_users
export async function addUserToDb(
  userId: string,
  userToken: string
): Promise<object> {
  try {
    const database = client.db(databaseName);
    const installedUsers = database.collection(installedUsersCollection);
    const user = {
      userId: userId,
      userToken: userToken,
    };
    console.log(`Adding user to DB: ${userId} - ${userToken}`);
    return await installedUsers.insertOne(user);
  } catch (error) {
    console.log(`Error writing user to DB: ${error}`);
  }
}

// addUserToDb("123", "456")
//     .then((result) => {console.log(result);})
//     .catch((error) => {console.log(error);});