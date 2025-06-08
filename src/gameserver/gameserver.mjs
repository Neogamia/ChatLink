import { io } from "socket.io-client";

const socket = io("http://localhost:7600");

export async function checkEvent(event, client) {
    const guild = await client.guilds.fetch('1380898476316950648');
    const channel = await guild.channels.fetch('1381280752007778394');

    socket.on(event, (msg) => {
        channel.send(msg)
    })
}