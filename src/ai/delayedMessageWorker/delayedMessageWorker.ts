import {redisClient, saveToQueue} from "./redisClient/redisClient";
import { getNextRunId } from "./redisClient/redisClient";
import {retrieveRun} from "../methods/runs/retrieveRun";
import {AssistantMessage, AssistantMessageContent, LettaMessageUnion, Run} from "@letta-ai/letta-client/api";
import {listRunMessages} from "../methods/runs/listRunMessages";
import {WorkerTaskForMessage} from "./interfaces/taskInterface";
import {flockSendFormattedReply} from "../../flock/chatMethods/chatSendFormattedReply";
import {flockSendFormattedMessage} from "../../flock/chatMethods/chatSendFormattedMessage";

export async function processQueue() {
    while (true) {
        const task: WorkerTaskForMessage = await getNextRunId();
        //console.log(`Worker: Task: ${JSON.stringify(task)}`);

        if (!task) {
            console.log("Worker: No pending responses. Sleeping...");
            await new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 sec
            continue;
        }

        console.log(`Worker: Checking response for runId: ${task.runId}`);

        try {
            const response: Run = await retrieveRun(task.runId);

            if (!response || !response.status || response.status !== "completed") {
                console.log(`Worker: Checking Task: ${task.runId}`)
                console.log('Worker: Task not completed. Re-queuing...')
                await saveToQueue(task.runId, task.channelId, task.userId, task.replyAttachment, task.messageId); // Re-queue for later check
            } else {
                console.log(`Worker: Processing response:`);
                console.table(response);

                const messages: LettaMessageUnion[] = await listRunMessages(task.runId);
                const assistantMessage: AssistantMessage | undefined = messages.find(
                    (msg: LettaMessageUnion): msg is AssistantMessage => msg.messageType === "assistant_message"
                );
                const assistantMessageText: AssistantMessageContent = assistantMessage.content;

                console.table(task);

                if (task.messageId){
                    console.log(`Worker: Sending to Flock Assistant message: ${JSON.stringify(assistantMessageText)}`);
                    console.log(`Worker: Send Formatted Reply ${task.channelId}, ${task.userId}, ${assistantMessageText.toString()}, ${JSON.stringify(task.replyAttachment)}, ${task.messageId}`);
                    flockSendFormattedReply(task.channelId, assistantMessageText.toString(), task.userId, task.replyAttachment, task.messageId);
                } else {
                    console.log(`Worker: Sending to Flock Assistant message: ${JSON.stringify(assistantMessageText)}`);
                    console.log(`Worker: Send Formatted Message ${task.channelId}, ${task.userId}, ${assistantMessageText.toString()}, ${JSON.stringify(task.replyAttachment)}, ${task.messageId}`);
                    flockSendFormattedMessage(task.channelId, assistantMessageText.toString(), task.userId);
                }
            }
        } catch (error) {
            console.error(`Worker: Error processing runId ${task.runId}: ${error}`);
            await saveToQueue(task.runId, task.channelId, task.userId, task.replyAttachment, task.messageId); // Retry later
        }

        await new Promise(resolve => setTimeout(resolve, 5000)); // Small delay before next check
    }
}

// flockSendFormattedReply(
//     "g:3adcca60dd874ea8b2798799efe61fd1",
//     "Hello buddy",
//     "u:wfzuwaxwruwrrrru",
//     {title: "Test Title", description: "Test description", color: "#fffff"},
//     "u:wfzuwaxwruwrrrru");
processQueue().catch(console.error);