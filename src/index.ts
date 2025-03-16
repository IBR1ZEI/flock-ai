import { closeDbConnection } from "./database/closeConnection/closeConnection";
process.loadEnvFile();

import flock from "flockos";
flock.appId = process.env.APP_ID;
flock.appSecret = process.env.APP_SECRET;
const port: number = Number(process.env.PORT) || 80;

const express = require("express");
const app = express();
require("./flock/eventHandlers/appInstallHandler");
require("./flock/eventHandlers/appUninstallHandler");
const webhookHandler = require("./flock/eventHandlers/webhookHandler");

app.use(flock.events.tokenVerifier, express.json());
app.post("/events", flock.events.listener); // Flock eventHandlers listener
app.post("/webhook", webhookHandler); // Webhook handler for getting messages

app.on("connection", function (socket: { setTimeout: (timeout: number) => void; }) {
    socket.setTimeout(100);
});

//Start event listeners
const server = app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

process.on("SIGINT" || "SIGTERM" || "SIGKILL", shutdown);
function shutdown() {
    try {
        server.close();
        console.log("gracefully shutted down express");
        closeDbConnection();
        console.log("closed db connection");
    } catch (error) {
        console.log(`Graceful shutdown failed due to error: ${error}`);
    }
}
