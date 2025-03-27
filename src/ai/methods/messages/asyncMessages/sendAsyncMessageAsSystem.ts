import { LettaClient } from "@letta-ai/letta-client";
import { LettaResponse, Run } from "@letta-ai/letta-client/api";

process.loadEnvFile();
const client = new LettaClient({
    baseUrl: process.env.LETTA_BASE_URL
});
const agentId: string = process.env.LETTA_AGENT_ID;

export async function sendAsyncMessageAsSystem (content: string): Promise<Run>  {
    try {
        const response: Run = await client.agents.messages.createAsync(agentId, {
            messages: [{
                role: "system",
                content: content
            }]
        });
        return response as Run;
    } catch (error) {
        console.log(`Error during sending async message as user: ${error}`);
    }
}
