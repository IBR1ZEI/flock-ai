import { getUserName } from "../userMethods/getUserName";
import { getUserTokenFromDb } from "../../database/userMethods/getUserToken";
import {sendAsyncMessageAsUser} from "../../ai/methods/messages/asyncMessages/sendAsyncMessageAsUser";
import {saveToQueue} from "../../ai/delayedMessageWorker/redisClient/redisClient";

import { Attachment } from "../chatMethods/interfaces/attachments";
import {Run} from "@letta-ai/letta-client/api";

process.loadEnvFile();
//const webhookToken: string = process.env.TEST_CHANNEL_WEBHOOK_TOKEN;
const botId: string = process.env.BOT_USER_ID;

module.exports = async (req, res) => {
    try {
        // console.log(`Body: ${JSON.stringify(req.body)}`);
        // console.log(`Attachments: ${JSON.stringify(req.body.attachments)}`);
        if (req.body.from !== botId && !req.body.attachments) {
            console.log("Webhook received from an installed user");
            //console.table(req.body);

            let userMessageForReplyAttachment: string;
            let userMessage: string;
            if (req.body.flockml) {
                userMessageForReplyAttachment = req.body.notification;
                userMessage = req.body.flockml;
            } else {
                userMessageForReplyAttachment = req.body.text;
                userMessage = req.body.text;
            }

            if (userMessageForReplyAttachment.length > 80) {
                userMessageForReplyAttachment = userMessageForReplyAttachment.slice(0, 80) + '...';
            }

            const channelId: string = req.body.to;
            const messageId: string = req.body.uid;
            const userId: string = req.body.from;
            const userToken: string = await getUserTokenFromDb(userId);
            const userName: string = await getUserName(userToken, req.body.from);
            const replyAttachment: Attachment = {
                title: `In reply to ${userName}`,
                description: userMessageForReplyAttachment,
                color: "#0BBE51"
            };

            console.log(`asking AI`);
            const runResponse: Run = await sendAsyncMessageAsUser(userMessage);
            const runId: string = runResponse.id;
            console.log(`Run Id: ${runId}`);
            saveToQueue(runId, channelId, process.env.TEST_USER_ID, replyAttachment, messageId)
                .catch(console.error);
        }
    } catch (error) {
        console.log(
            `Error during webhook execution (new message processing): ${error}`
        );
    }
};
