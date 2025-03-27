import {Attachment} from "./interfaces/attachments";

const flock = require("flockos");
process.loadEnvFile();
const botToken: string = process.env.BOT_TOKEN;

export function flockSendRegularReply (
    destination: string,
    message: string,
    onBehalfOf: string,
    attachments: Attachment[],
    replyOf: string
) {
    try {
        flock.chat.sendMessage(botToken, {
            to: destination,
            text: message,
            onBehalfOf: onBehalfOf,
            attachments: [attachments],
            replyOf: replyOf
        });
        console.log("Sending Regular Reply")
        console.table({
            to: destination,
            text: message,
            onBehalfOf: onBehalfOf,
            attachments: [attachments],
            replyOf: replyOf
        });
    } catch (error) {
        console.log(`Error flockSendRegularReply: ${error}`);
    }
}
