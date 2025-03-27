import { LettaClient } from "@letta-ai/letta-client";
import {LettaMessageUnion, LettaResponse, Run} from "@letta-ai/letta-client/api";
import { Runs } from "@letta-ai/letta-client/api/resources/runs/client/Client";

process.loadEnvFile();
const client = new LettaClient({
    baseUrl: process.env.LETTA_BASE_URL
});
const agentId = process.env.LETTA_AGENT_ID;

export async function listRunMessages (runId: string): Promise<LettaMessageUnion[]> {
    try {
        const response: LettaMessageUnion[] = await client.runs.listRunMessages(runId);
        return response as LettaMessageUnion[];
    } catch (error) {
        console.log(`Error during retrieving run: ${error}`);
    }
}
