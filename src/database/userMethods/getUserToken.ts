import { client } from "../dbOperations";
process.loadEnvFile();

const databaseName: string = process.env.DATABASE_NAME;
const installedUsersCollection: string = process.env.INSTALLED_USERS_COLLECTION;

//get user token from DB by userId
export async function getUserTokenFromDb(userId: string): Promise<string> {
  try {
    const database = client.db(databaseName);
    const installedUsers = database.collection(installedUsersCollection);

    const user = await installedUsers.findOne(
      { userId: userId },
      { projection: { userToken: 1, _id: 0 } }
    );
    return user ? user.userToken.toString() : null;

  } catch (error) {
    console.log(`Error getting user token: ${error}`);
  }
}

// getUserTokenFromDb("u:wfzuwaxwruwrrrru")
//     .then((result) => {console.log(result);})
//     .catch((error) => {console.log(error);});