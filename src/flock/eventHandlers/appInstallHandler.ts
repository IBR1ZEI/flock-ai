import { addUserToDb} from "../../database/userMethods/addUser";
import flock from "flockos";
import {AppInstallEvent} from "./interfaces/appInstallEvent/appInstallEvent";
import {CallbackFunction} from "./interfaces/callbackFunction/callbackFunction";
process.loadEnvFile();

//Installation event listener
flock.events.on("app.install", function (event: AppInstallEvent, callback: CallbackFunction) {
    try {
        addUserToDb(event.userId, event.token);
        callback();
    } catch (error) {
        console.log(`Error during app installation: ${error}`);
    }
});

module.exports = {};