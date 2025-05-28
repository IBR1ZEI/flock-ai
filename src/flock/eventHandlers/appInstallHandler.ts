import { addUserToDb} from "../../database/userMethods/addUser";
import flock from "flockos";
import {AppInstallEvent} from "./interfaces/appInstallEvent/appInstallEvent";
import {CallbackFunction} from "./interfaces/callbackFunction/callbackFunction";
import {getUserName} from "../userMethods/getUserName";
process.loadEnvFile();

//Installation event listener
flock.events.on("app.install", async function (event: AppInstallEvent, callback: CallbackFunction) {
    try {
        callback();
        const userName: string = await getUserName(event.token, event.userId);
        addUserToDb(event.userId, event.token, userName);
    } catch (error) {
        console.log(`Error during app installation: ${error}`);
    }
});

module.exports = {};