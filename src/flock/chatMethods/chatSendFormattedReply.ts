import {Attachment} from "./interfaces/attachments";

const flock = require("flockos");
process.loadEnvFile();
const botToken: string = process.env.BOT_TOKEN;

export function flockSendFormattedReply (
    destination: string,
    message: string,
    onBehalfOf: string,
    attachments: Attachment,
    replyOf: string
): void {
    try {
        flock.chat.sendMessage(botToken, {
            to: destination,
            flockml: message,
            onBehalfOf: onBehalfOf,
            attachments: [attachments],
            replyOf: replyOf
        });
        console.log("Sending Formatted Reply")
        console.table({
            to: destination,
            flockml: message,
            onBehalfOf: onBehalfOf,
            attachments: [attachments],
            replyOf: replyOf
        });
    } catch (error) {
        console.log(`Error flockSendFormattedReply: ${error}`);
    }
}
