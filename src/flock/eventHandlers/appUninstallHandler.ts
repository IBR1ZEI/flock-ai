import { deleteUserFromDb } from "../../database/userMethods/deleteUser";
import flock from "flockos";
import {AppUninstallEvent} from "./interfaces/appUninstallEvent/appuninstallEvent";
import {CallbackFunction} from "./interfaces/callbackFunction/callbackFunction";
process.loadEnvFile();

//Uninstallation event listener
flock.events.on("app.uninstall", function (event: AppUninstallEvent, callback: CallbackFunction) {
    try {
        deleteUserFromDb(event.userId);
        callback();
    } catch (error) {
        console.log(`Error during app uninstallation: ${error}`);
    }
});

module.exports = {};