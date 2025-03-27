import { LettaClient } from "@letta-ai/letta-client";
import { LettaResponse } from "@letta-ai/letta-client/api";

process.loadEnvFile();
const client = new LettaClient({
    baseUrl: process.env.LETTA_BASE_URL
});
const agentId = process.env.LETTA_AGENT_ID;

export async function sendMessageAsSystem (content: string): Promise<LettaResponse>  {
    try {
        const response: LettaResponse = await client.agents.messages.create(agentId, {
            messages: [{
                role: "user",
                content: content
            }]
        });
        return response as LettaResponse;
    } catch (error) {
        console.log(`Error during sending message as user: ${error}`);
    }
}


