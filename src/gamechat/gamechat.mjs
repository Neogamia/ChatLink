import { io } from "socket.io-client";

const socket = io("http://localhost:7500");

export async function receiveFromSocket(client) {
    const guild = await client.guilds.fetch('1380898476316950648');
    const channel = await guild.channels.fetch('1380898924876791928');

    socket.on("getLatestChatMessage", (msg) => {
        console.log("Received from server:", msg);
        if (channel && channel.isTextBased() && msg != null) {
            channel.send(msg);
        }
    });
};

export function sendToSocket(event, message) {
    socket.emit(event, message);
}