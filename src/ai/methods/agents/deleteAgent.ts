import {LettaClient} from "@letta-ai/letta-client";

process.loadEnvFile();
const client = new LettaClient({
    baseUrl: process.env.LETTA_BASE_URL
});

async function deleteAgent (agentId: string): Promise<object>  {
    try {
        // @ts-ignore
        return await client.agents.delete(agentId)
    } catch (error) {
        console.log(`Error during sending message as user: ${error}`);
    }
}

const agentId = "agent-d021683e-5ed1-4deb-877a-7839bce18c0c";
deleteAgent(agentId)
    .then((response) => {
        console.log(`deleting agent ${agentId}`);
        console.log(`response: ${JSON.stringify(response)}`);
    })
    .catch((error) => {
        console.log(`Error during deleting agent: ${error}`);
    });