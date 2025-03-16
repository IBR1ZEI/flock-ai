import { client } from "../dbOperations";

export async function closeDbConnection(): Promise<void> {
  await client.close();
}
