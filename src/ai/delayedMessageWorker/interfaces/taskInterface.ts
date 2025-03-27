import {Attachment} from "../../../flock/chatMethods/interfaces/attachments";

export interface WorkerTaskForMessage {
    runId: string;
    channelId: string;
    userId: string;
    replyAttachment: Attachment;
    messageId: string;
}
