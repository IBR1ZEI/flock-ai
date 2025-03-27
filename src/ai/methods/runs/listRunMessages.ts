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

// listRunMessages("run-0606318d-0b55-4aea-b31a-a9af48b40c91")
//     .then((response) => {
//         console.log(JSON.stringify(response));
//     })
//     .catch((error) => {
//         console.log(`Error during sending message as user: ${error}`);
//     })