import { Message } from "./message/message";
import { Usage } from "./usage/usage";

export interface AiResponse {
    messages: Message[];
    usage: Usage;
}