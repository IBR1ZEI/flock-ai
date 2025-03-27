import flock from "flockos";
import { CallbackFunction } from "./interfaces/callbackFunction/callbackFunction";

const adminUserIds = require("../../config").adminUsers
import { sendAsyncMessageAsSystem } from "../../ai/methods/messages/asyncMessages/sendAsyncMessageAsSystem";
import {Run} from "@letta-ai/letta-client/api";
import {saveToQueue} from "../../ai/delayedMessageWorker/redisClient/redisClient";

//Slash command event listener
flock.events.on("client.slashCommand", async function (event, callback) {
    try {
        if (adminUserIds.includes(event.userId)) {
            console.log('Received slash command from admin user');
            callback(null, {text: "Message sent to AI, please wait for a response in chat"});
            console.table(event);
            const channelId: string = event.chat;
            const userId: string = event.userId;
            const userMessage: string = event.text;

            console.log(`asking AI`);
            const runResponse: Run = await sendAsyncMessageAsSystem(userMessage);
            const runId: string = runResponse.id;
            console.log(`Run Id: ${runId}`);
            saveToQueue(runId, channelId, userId).catch(console.error);
        } else {
            console.log('Received slash command from non-admin user');
            callback(null, {text: "Sorry, you are not authorized to use this command. " +
                    "Only PP team members can use this command."});
        }
    } catch (error) {
        console.log(`Error during slash command execution: ${error}`);
    }
});

module.exports = {};