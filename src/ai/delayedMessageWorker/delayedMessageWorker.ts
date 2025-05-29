import { saveToQueue } from "./redisClient/redisClient";
import { getNextRunId } from "./redisClient/redisClient";
import { retrieveRun } from "../methods/runs/retrieveRun";
import { AssistantMessage, AssistantMessageContent, LettaMessageUnion, Run } from "@letta-ai/letta-client/api";
import { listRunMessages } from "../methods/runs/listRunMessages";
import { WorkerTaskForMessage } from "./interfaces/taskInterface";
import { handleErrorMessage } from "./errorMessageHandler/errorMessageHandler";

export async function processQueue() {
    while (true) {
        const task: WorkerTaskForMessage = await getNextRunId();

        if (!task) {
            //console.log("Worker: No pending responses. Sleeping...");
            await new Promise(resolve => setTimeout(resolve, 5000)); // Sleep for 5 sec
            continue;
        }

        console.log(`Worker: Checking response for runId: ${task.runId}`);

        try {
            const response: Run = await retrieveRun(task.runId);
            let assistantMessageText: AssistantMessageContent;

            if (response.status === "completed") {
                console.log("Worker: Task completed")
                console.log(`Worker: Processing response:`);
                console.table(response);

                const messages: LettaMessageUnion[] = await listRunMessages(task.runId);
                const assistantMessage: AssistantMessage | undefined = messages.find(
                    (msg: LettaMessageUnion): msg is AssistantMessage => msg.messageType === "assistant_message"
                );

                if (assistantMessage == undefined) {
                    assistantMessageText = "Sorry, there was an internal error with AI agent. Please ask again.";
                    console.log(`Worker: Assistant message is UNDEFINED. Send Error message Formatted Reply ${task.channelId}, ${task.userId}, ${assistantMessageText.toString()}, ${JSON.stringify(task.replyAttachment)}, ${task.messageId}`);
                } else {
                    assistantMessageText = assistantMessage.content.toString();
                    console.log(`AssistantMessageText: ${assistantMessageText}`);

                    handleErrorMessage (task, assistantMessageText);
                }
                console.table(task);

            } else if (response?.status === "failed") {
                assistantMessageText = "Sorry, there was an internal error with AI agent. Please ask again.";
                console.log(`Worker: Task ${task.runId} failed.`);
                console.log(`Response: ${JSON.stringify(response)}`);

                handleErrorMessage (task, assistantMessageText);

            } else {
                console.log(`Worker: Task not completed (Status: ${response?.status}). Re-queuing...`)
                await saveToQueue(task.runId, task.channelId, task.userId, task.replyAttachment, task.messageId); // Re-queue for later check
            }
        } catch (error) {
            console.error(`Worker: Error processing runId ${task.runId}: ${error}`);
        }

        await new Promise(resolve => setTimeout(resolve, 5000)); // Small delay before next check
    }
}

processQueue().catch(console.error);
