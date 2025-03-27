import { LettaClient } from "@letta-ai/letta-client";
import { LettaResponse, Run } from "@letta-ai/letta-client/api";
import { Runs } from "@letta-ai/letta-client/api/resources/runs/client/Client";

process.loadEnvFile();
const client = new LettaClient({
    baseUrl: process.env.LETTA_BASE_URL
});
const agentId = process.env.LETTA_AGENT_ID;

export async function retrieveRun (runId: string): Promise<Run>  {
    try {
        const response: Run = await client.runs.retrieveRun(runId);
        return response as Run;
    } catch (error) {
        console.log(`Error during retrieving run: ${error}`);
    }
}
