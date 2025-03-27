import { createClient } from 'redis';
import {Attachment} from "../../../flock/chatMethods/interfaces/attachments";
import {WorkerTaskForMessage} from "../interfaces/taskInterface";

export const redisClient = createClient();

export async function saveToQueue(runId: string, channelId: string, userId: string, replyAttachment?: Attachment, messageId?: string) {
    console.log(`Worker: Saving runId ${runId} to redis queue`);
    try{
        await redisClient.connect();
        await redisClient.lPush("ai_runs_queue", JSON.stringify({ runId, channelId, userId, replyAttachment, messageId }));
        await redisClient.quit();
    } catch (err) {
        console.error("Worker: Error saving to Redis:", err);
    }
}

export async function getNextRunId(): Promise<WorkerTaskForMessage | null> {
    try {
        await redisClient.connect();
        const data: string | null = await redisClient.rPop("ai_runs_queue");
        await redisClient.quit();

        if (!data) return null;

        const parsed: WorkerTaskForMessage = JSON.parse(data);

        // Optional: Validate required fields
        if (!parsed.runId || !parsed.channelId || !parsed.userId) {
            console.log("Worker: Invalid message payload in Redis:", parsed);
            return null;
        }

        return parsed;
    } catch (error) {
        console.log("Worker: Error reading from Redis or parsing JSON:", error);
        return null;
    }
}

