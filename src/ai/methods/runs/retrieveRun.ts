import { LettaClient } from "@letta-ai/letta-client";
import { Run } from "@letta-ai/letta-client/api";

process.loadEnvFile();
const client = new LettaClient({
    baseUrl: process.env.LETTA_BASE_URL
});

export async function retrieveRun (runId: string): Promise<Run>  {
    try {
        const response: Run = await client.runs.retrieveRun(runId);
        return response as Run;
    } catch (error) {
        console.log(`Error during retrieving run: ${error}`);
    }
}
