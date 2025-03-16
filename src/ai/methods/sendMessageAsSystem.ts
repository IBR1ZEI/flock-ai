import {LettaClient} from "@letta-ai/letta-client";

process.loadEnvFile();
const client = new LettaClient({
    baseUrl: process.env.LETTA_BASE_URL
});
const agentId: string = process.env.LETTA_AGENT_ID;

export async function sendMessageAsSystem(content: string): Promise<object>  {
    try {
        return await client.agents.messages.create(agentId, {
            messages: [{
                role: "system",
                content: content
            }]
        });
    } catch (error) {
        console.log(`Error during sending message as user: ${error}`);
    }
}


