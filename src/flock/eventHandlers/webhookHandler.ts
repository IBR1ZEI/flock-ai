import { getUserName } from "../userMethods/getUserName";
import { flockSendRegularMessage } from "../chatMethods/chatSendRegularMessage";
import { flockSendFormattedMessage } from "../chatMethods/chatSendFormattedMessage";

import { sendMessageAsUser } from "../../ai/methods/sendMessageAsUser";
import { sendMessageAsSystem } from "../../ai/methods/sendMessageAsSystem";
import {
    AssistantMessage,
    AssistantMessageContent,
    LettaMessageUnion,
    LettaResponse
} from "@letta-ai/letta-client/api";
import { Attachment } from "../chatMethods/interfaces/attachments";
import { flockSendRegularReply } from "../chatMethods/chatSendRegularReply";
import { flockSendFormattedReply } from "../chatMethods/chatSendFormattedReply";
import { getUserTokenFromDb } from "../../database/userMethods/getUserToken";

process.loadEnvFile();
const webhookToken: string = process.env.TEST_CHANNEL_WEBHOOK_TOKEN;
const botId: string = process.env.BOT_USER_ID;
const botConfig = require("../../config");

module.exports = async (req, res) => {
    try {
        //check that message is received from the correct chat if message contains 'text' (filters bot messages);
        //otherwise - ignore
        if (req.query.token == webhookToken && req.body.from !== botId && !req.body.attachments) {
            console.log("Webhook received a message");
            console.log(req.body);

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
                userMessageForReplyAttachment = userMessageForReplyAttachment.slice(0, 80)+'...';
            }


            const channelId: string = req.body.to;
            const messageId: string = req.body.uid;
            const userId: string = req.body.from;
            const userToken: string = await getUserTokenFromDb(userId);
            const userName: string = await getUserName(userToken, req.body.from);
            const replyAttachment: Attachment[] = [{
                title: `In reply to ${userName}`,
                description: userMessageForReplyAttachment,
                color: "#0BBE51"
            }];

            console.log(`asking AI `);
            //flockSendRegularMessage(req.body.to, "Checking your question", req.body.from);

            const questionToAi: string = req.body.text;
            const responseFromAi: LettaResponse = await sendMessageAsUser(questionToAi);
            console.log(JSON.stringify(responseFromAi));

            const assistantMessage: AssistantMessage | undefined = responseFromAi.messages.find(
                (msg: LettaMessageUnion): msg is AssistantMessage => msg.messageType === "assistant_message"
            );
            if (assistantMessage !== undefined) {
                const assistantMessageText: AssistantMessageContent = assistantMessage.content;
                flockSendFormattedReply(channelId, assistantMessageText.toString(), userId, replyAttachment, messageId)
                //flockSendRegularReply(channelId, assistantMessageText.toString(), userId, replyAttachment, messageId)
            } else {
                console.log("No assistant message found");
                flockSendRegularReply(channelId, "Sorry, something went wrong: no assistant message found", userId, replyAttachment, messageId)
            }






            // //check if message starts with prefix; otherwise - ignore
            // if (botConfig.prefix.includes(req.body.text[0])) {
            //     //remove prefix; turn string into array to work with
            //     let message: string[] = stringToArray(
            //         trimAndLowerCase(req.body.text.substring(1))
            //     );




                // //HELP
                // if (botConfig.commandHelp.includes(message[0])) {
                //     sendMLMessage(req.body.to, helpMessage, req.body.from);
                // }
                //
                // //WELCOME
                // if (botConfig.commandWelcome.includes(message[0])) {
                //     sendMLMessage(req.body.to, welcomeMessage, req.body.from);
                // }
        }
    } catch (error) {
        console.log(
            `Error during webhook execution (new message processing): ${error}`
        );
    }
};