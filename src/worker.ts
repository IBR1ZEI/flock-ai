import {processQueue} from "./ai/delayedMessageWorker/delayedMessageWorker";
import { redisClient } from "./ai/delayedMessageWorker/redisClient/redisClient";

processQueue().catch(console.error);