export interface Usage {
    messageType: string;
    completionTokens: number;
    promptTokens: number;
    totalTokens: number;
    stepCount: number;
}