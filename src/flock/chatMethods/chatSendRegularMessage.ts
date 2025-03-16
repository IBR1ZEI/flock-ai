const flock = require("flockos");
process.loadEnvFile();
const botToken: string = process.env.BOT_TOKEN;

export function flockSendRegularMessage(
    destination: string, //user 'u:id' or channel 'g:id'
    message: string,
    onBehalfOf: string //required if sending to channel
): void {
    try {
        flock.chat.sendMessage(botToken, {
            to: destination,
            text: message,
            onBehalfOf: onBehalfOf
        });
    } catch (error) {
        console.error("Error flockSendRegularMessage:", error);
    }
}