import {flockSendFormattedReply} from "../../../flock/chatMethods/chatSendFormattedReply";
import {flockSendFormattedMessage} from "../../../flock/chatMethods/chatSendFormattedMessage";
import {WorkerTaskForMessage} from "../interfaces/taskInterface";

export function handleErrorMessage (task: WorkerTaskForMessage, assistantMessageText: string) {
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

