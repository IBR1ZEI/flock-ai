export interface Message {
    id: string;
    date: string;
    messageType: string;
    content?: string; // Optional property for messages that include content
    reasoning?: string; // Optional for reasoning messages
}