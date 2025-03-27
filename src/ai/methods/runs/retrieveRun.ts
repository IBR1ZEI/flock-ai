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

// retrieveRun("run-fd8eb2a0-90fb-442a-b51f-f953a01da736")
//     .then((response) => {
//     console.log(JSON.stringify(response.status));
// })
//     .catch((error) => {
//         console.log(`Error during sending message as user: ${error}`);
//     })

// {"createdById":"user-00000000-0000-4000-8000-000000000000","lastUpdatedById":"user-00000000-0000-4000-8000-000000000000","createdAt":"2025-03-25T18:11:03.873Z","updatedAt":"2025-03-25T18:11:06.958Z","status":"completed","completedAt":"2025-03-25T16:11:06.957Z","metadata":{"result":{"messages":[{"id":"message-e79ec2f4-cb4a-49be-bab6-9e7ff4dfa830","date":"2025-03-25T18:11:06+00:00","message_type":"reasoning_message","reasoning":"Another async message from the user. Keeping the response consistent and friendly!"},{"id":"message-e79ec2f4-cb4a-49be-bab6-9e7ff4dfa830","date":"2025-03-25T18:11:06+00:00","message_type":"assistant_message","content":"<flockml>Hello again! Test received successfully. How can I help you today?</flockml>"}],"usage":{"message_type":"usage_statistics","completion_tokens":56,"prompt_tokens":7199,"total_tokens":7255,"step_count":1}}},"jobType":"run","id":"run-fd8eb2a0-90fb-442a-b51f-f953a01da736","user_id":"user-00000000-0000-4000-8000-000000000000"}