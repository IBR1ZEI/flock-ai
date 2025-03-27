const flock = require("flockos");
process.loadEnvFile();
const botToken: string = process.env.BOT_TOKEN;

export async function getUserName(
  userToken: string,
  userId: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      flock.callMethod(
        "users.getPublicProfile",
        botToken,
        {
          token: userToken,
          userId: userId,
        },
        (error, response) => {
          if (error) {
            console.error("Error fetching user profile:", error);
            reject(error); // Reject the promise on error
          } else {
            const fullName: string = `${response.firstName} ${response.lastName}`.trim();
            resolve(fullName);
          }
        }
      );
    } catch (error) {
      console.error("Error during getting user name:", error);
      reject(error);
    }
  });
}
//TODO: refactor this method to use async/await